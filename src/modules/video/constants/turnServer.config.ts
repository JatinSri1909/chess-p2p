// Configuration for TURN servers to assist in NAT traversal
export const turnServerConfig: RTCIceServer[] = [
  {
    urls: "turn:global.relay.metered.ca:80",
    username: process.env.NEXT_PUBLIC_TURN_SERVER_USERNAME,
    credential: process.env.NEXT_PUBLIC_TURN_SERVER_CREDENTIAL,
  },
  {
    urls: "turn:global.relay.metered.ca:80?transport=tcp",
    username: process.env.NEXT_PUBLIC_TURN_SERVER_USERNAME,
    credential: process.env.NEXT_PUBLIC_TURN_SERVER_CREDENTIAL,
  },
  {
    urls: "turn:global.relay.metered.ca:443",
    username: process.env.NEXT_PUBLIC_TURN_SERVER_USERNAME,
    credential: process.env.NEXT_PUBLIC_TURN_SERVER_CREDENTIAL,
  },
  {
    urls: "turns:global.relay.metered.ca:443?transport=tcp",
    username: process.env.NEXT_PUBLIC_TURN_SERVER_USERNAME,
    credential: process.env.NEXT_PUBLIC_TURN_SERVER_CREDENTIAL,
  },
];

export const rtcPeerConnectionConfig: RTCConfiguration = {
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun.relay.metered.ca:80" },
    ...turnServerConfig,
  ],
};
