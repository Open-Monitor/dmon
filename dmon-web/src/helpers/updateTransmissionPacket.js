export default (current, packet, types) => {
  const updated = { ...current };

  types.forEach(type => {
    updated[type] = {
      ...current[type],
      [packet.IP]: [
        ...((current[type][packet.IP] !== undefined) ? current[type][packet.IP] : []),
        packet[type],
      ]
    }
  });

  return updated;
}