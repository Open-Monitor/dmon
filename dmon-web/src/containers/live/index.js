import React, { useContext, useEffect, useReducer } from 'react';

import { Breadcrumb, Container, Row } from 'react-bootstrap';

import LiveTransmissionReducer from '../../reducers/live-transmissions';
import INITIAL_STATE, {
  PUSH_PACKET,
  APPLY_IP,
  APPLY_COLOR,
} from '../../constants/live-transmission';

import useLive from './useLive';
import context from './context';
import Single from './container-single';
import All from './container-all';
import { autoSuggestContext } from '../../components/layout/header';

const PACKET_ACTIONS = [PUSH_PACKET, APPLY_IP, APPLY_COLOR];

export default ({ match: { params }, history }) => {
  const [{ ips, colors, packetInfo }, dispatch] = useReducer(
    LiveTransmissionReducer,
    INITIAL_STATE,
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

  useLive((packet) => PACKET_ACTIONS
    .forEach(action => dispatch({ type: action, payload: packet })),
    // this in a way is a "hack", the server will
    // return us everything if the ips array is empty
    !!params.ip ? [params.ip] : [],
    [packetInfo, params.id]
  );

  return (
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
      <context.Provider value={{ transmissionPackets: packetInfo, colors }}>
        {
          {
            [true || params.ip === undefined]: <All />,
            [params.ip !== undefined]: <Single focused={params.ip} />
          }.true
        }
      </context.Provider>
    </Container>
  )
}
