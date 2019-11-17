export const MAX_ITEMS = 50;

export const checkMax = (set, clients) => set.length > MAX_ITEMS ?
set.slice(set.length -MAX_ITEMS + clients, set.length) : set;

export default (current, packet, types) => {
  const updated = { ...current };
  const clientsLength = Object.keys(current[types[0]]).length;

  types.forEach(type => {
    updated[type] = {
      ...current[type],
      [packet.IP]: [
        // we want to start shifting items off after about 50
        // packets to save some space
        ...((current[type][packet.IP] !== undefined)
          ? checkMax(current[type][packet.IP], clientsLength)
          : []
        ),
        packet[type],
      ]
    }
  });

  return updated;
}
