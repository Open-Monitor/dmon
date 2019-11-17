export const MAX_ITEMS = 50;

export const checkMax = (set) => set.length > MAX_ITEMS ?
set.slice(set.length -MAX_ITEMS + 1, set.length) : set;

export default (current, packet, types) => {
  const updated = { ...current };

  types.forEach(type => {
    updated[type] = {
      ...current[type],
      [packet.IP]: [
        // we want to start shifting items off after about 50
        // packets to save some space
        ...((current[type][packet.IP] !== undefined)
          ? checkMax(current[type][packet.IP])
          : []
        ),
        packet[type],
      ]
    }
  });

  return updated;
}
