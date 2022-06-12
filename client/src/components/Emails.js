import React, { useCallback, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const gmailListEMails = "https://gmail.googleapis.com/gmail/v1/users/me/messages"
const gmailGetMessage = "https://gmail.googleapis.com/gmail/v1/users/me/messages/"

const width = 940
const height = 500

function Emails() {
  const [messages, setMessages] = useState({})
  // const [nextPageToken, setNextPageToken] = useState('')
  // const [resultSizeEstimate, setResultSizeEstimate] = useState(0)
  
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);

  const loadByFrom = useCallback((messageIds) => {
    const accessToken = localStorage.getItem('access_token')
    const data = {}
    Promise.all(messageIds.map(({ id }) => {
      return axios.get(gmailGetMessage + id, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((res) => {
        const headers = res.data.payload.headers
        Object.keys(headers).map((key) => {
          const header = headers[key]
          if (header['name'] === 'From') {
            if (data.hasOwnProperty(header['value'])) {
              data[header['value']]+=1
            } else {
              data[header['value']]=1
            }
          }
        })
      })
    })).then(() => setMessages(data))
  }, [])

  useEffect(() => {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      axios.get(gmailListEMails, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        },
        params: {
          labelIds: "INBOX"
        }
      }).then((res) => {
        loadByFrom(res.data.messages)
        // setNextPageToken(res.data.nextPageToken)
        // setResultSizeEstimate(res.data.resultSizeEstimate)
      })

    }
  }, [loadByFrom])

  useEffect(() => {
    if (Object.keys(messages).length > 0) {
      const data = Object.keys(messages).map(from => ({
        name: from,
        size: messages[from]
      }))

      // create a tooltip
      var Tooltip = d3.select(tooltipRef.current)
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

      // Three function that change the tooltip when user hover / move / leave a cell
      var mouseover = function (event, d) {
        Tooltip
          .style("opacity", 1)
      }
      var mousemove = function (event, d) {
        Tooltip
          .html('<u>' + d.name + '</u>' + "<br>" + d.size + " emails received")
          .style("left", (event.x/2+20) + "px")
          .style("top", (event.y/2-30) + "px")
      }
      var mouseleave = function (event, d) {
        Tooltip
          .style("opacity", 0)
      }

      const svg = d3.select(svgRef.current)
                .attr("width", width)
                .attr("height", height)

      // Color palette for continents?
      var color = d3.scaleOrdinal()
        .domain([0, 50])
        .range(d3.schemeSet1);

      const node = svg.append("g")
        .selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
          .attr("class", "node")
          .attr("r", (d) => {
            return (d.size + 10)
          })
          .attr("cx", width / 2)
          .attr("cy", height / 2)
          .style("fill", function (d) { return color(d.size) })
          .style("fill-opacity", 0.7)
          .attr("stroke", "black")
          .style("stroke-width", 1)
          .on("mouseover", mouseover)
          .on("mousemove", mousemove)
          .on("mouseleave", mouseleave)
          .call(d3.drag() // call specific function when circle is dragged
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

      // Features of the forces applied to the nodes:
      const simulation = d3.forceSimulation()
        .force("center", d3.forceCenter().x(width / 2).y(height / 2)) // Attraction to the center of the svg area
        .force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
        .force("collide", d3.forceCollide().strength(.01).radius(30).iterations(1)) // Force that avoids circle overlapping

      // Apply these forces to the nodes and update their positions.
      // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
      simulation
        .nodes(data)
        .on("tick", function (d) {
          node
            .attr("cx", function (d) { return d.x; })
            .attr("cy", function (d) { return d.y; })
        });

      // What happens when a circle is dragged?
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(.03).restart();
        d.fx = d.x;
        d.fy = d.y;
      }
      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }
      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(.03);
        d.fx = null;
        d.fy = null;
      }
    }
  }, [messages])

  return (
    <>
      <svg ref={svgRef} />
      <div ref={tooltipRef} style={{position: 'absolute'}} />
    </>
  )
}

export default Emails;
