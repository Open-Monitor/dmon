import React, { useContext } from 'react';

import { Container, Row } from 'react-bootstrap';

import { GraphContainer, UptimeContainer } from '../../components/container';
import { LineGraph, HorizontalBarGraph, PolarGraph, Doughnut } from '../../components/graphs';
import context from './context';

import './index.css';

export default () => {
  const { transmissionPackets, colors } = useContext(context);

  return (
    <Container fluid="true" className="main-cont">
      <Row className="">
        <GraphContainer title="Cpu" info="Percentage of usage on all cores.">
          <LineGraph
            colors={colors}
            fill={true}
            data={transmissionPackets.CpuUsage}
            hostName={transmissionPackets.hostName}
            title="Cpu"
          />
        </GraphContainer>
        <GraphContainer title="Memory Usage" info="Memory usage is measured in KiloBytes.">
          <Doughnut
            colors={colors}
            data={transmissionPackets.MemoryUsed}
            data2={transmissionPackets.MemoryAvailable}
            data3={transmissionPackets.MemoryTotal}
            hostName={transmissionPackets.hostName}
            title="MemoryUsed"
          />
        </GraphContainer>
        <GraphContainer title="Inbound Bytes" info="Total number of KiloBytes received by the server.">
          <LineGraph
            colors={colors}
            fill={true}
            data={transmissionPackets.InboundBandwithBytes}
            hostName={transmissionPackets.hostName}
            title="Inbound Bytes"
          />
        </GraphContainer>
        <GraphContainer title="Outbound Bytes" info="Total number of KiloBytes sent from the server.">
          <LineGraph
            colors={colors}
            fill={true}
            data={transmissionPackets.OutboundBandwithBytes}
            hostName={transmissionPackets.hostName}
            title="Outbound Bytes"
          />
        </GraphContainer>
        <GraphContainer title="Inbound Packets" info="Total number of packets received by the server.">
          <LineGraph
            colors={colors}
            fill={true}
            data={transmissionPackets.InboundBandwithPackets}
            hostName={transmissionPackets.hostName}
            title="Outbound Packets"
          />
        </GraphContainer>
        <GraphContainer title="Outbound Packets"info="Total number of packets sent from the server.">
          <LineGraph
            colors={colors}
            fill={true}
            data={transmissionPackets.OutboundBandwithPackets}
            hostName={transmissionPackets.hostName}
            title="Outbound Packets"
          />
        </GraphContainer>
      </Row>
    </Container>
  )
}
