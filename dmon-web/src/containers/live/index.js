import React, { useState, useMemo, useContext, useEffect } from 'react';

import { Breadcrumb, Container, Row } from 'react-bootstrap';

import useLive from './useLive';
import context from './context';
import INITIAL_TRANSMISSION_STATE from './initial_state';
import { generateRgb, updateTransmissionPacket } from '../../helpers';
import Single from './container-single';
import All from './container-all';
import { autoSuggestContext } from '../../components/layout/header';

export default ({ match: { params }, history }) => {
  const [transmissionPackets, setTransmissionPackets] = useState(INITIAL_TRANSMISSION_STATE); // todo: might want to change out this state for reducers.
  const [colors, setColors] = useState([]);
  const [ips, setIps] = useState([]);

  const stateKeys = useMemo(
    () => Object.keys(INITIAL_TRANSMISSION_STATE),
    [INITIAL_TRANSMISSION_STATE]
  );

  const { updateSuggestions, setHandlerCb } = useContext(autoSuggestContext);
  useEffect(() => {
    setHandlerCb({
      fn: (item) => history.push(`/live/${item}`)
    });
  }, [])

  useEffect(() => {
    updateSuggestions(ips.map(x => ({
      name: x,
    })))
  }, [ips])

  useLive((packet) => {
    setColors(prev => (
      prev[packet.IP] === undefined
    ) ? { ...prev, [packet.IP]: generateRgb() }
      : prev
    );

    setIps(prev => (~~prev.indexOf(packet.IP) ? [
      ...prev, packet.IP,
    ] : prev));

    setTransmissionPackets(prev => ({
      ...updateTransmissionPacket(prev, packet, stateKeys),
    }))
  },
    // this in a way is a "hack", the server will
    // return us everything if the ips array is empty
    !!params.ip ? [params.ip] : [], 
    [transmissionPackets, params.id]
  );

  return (
    <React.Fragment>
      <Container fluid className="main-cont pt-5 pb-4" style={{ marginTop: '2rem' }}>
        <Row>
          <Breadcrumb className="bcrumbs my-2">
            <Breadcrumb.Item className="bcrumb-item-false" href={params.ip === undefined ? undefined : "/"}>Home</Breadcrumb.Item>
            <Breadcrumb.Item className="bcrumb-item" href={params.ip === undefined ? undefined : "/live"}>Live</Breadcrumb.Item>
            <Breadcrumb.Item className="bcrumb-item">
              {
                params.ip
              }
            </Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <context.Provider value={{ transmissionPackets, colors }}>
          {
            {
              [true || params.ip === undefined]: <All />,
              [params.ip !== undefined]: <Single focused={params.ip} />
            }.true
          }
        </context.Provider>
      </Container>

    </React.Fragment>

  )
}
