"use client";

import AgoraRTC, {
       AgoraRTCProvider,
       LocalVideoTrack,
       RemoteUser,
       useJoin,
       useLocalCameraTrack,
       useLocalMicrophoneTrack,
       usePublish,
       useRTCClient,
       useRemoteAudioTracks,
       useRemoteUsers,
} from "agora-rtc-react";

function Call(props: { appId: string; channelName: string }) {
       const client = useRTCClient(
              AgoraRTC.createClient({ codec: "vp8", mode: "rtc" })
       );

       return (
              <AgoraRTCProvider client={client}>
                     <Videos channelName={props.channelName} AppID={props.appId} />
                     <div className="fixed z-10 bottom-0 left-0 right-0 flex justify-center pb-4">
                            <a
                                   className="px-5 py-3 text-base font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-500 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900 w-40"
                                   href="/"
                            >
                                   End Call
                            </a>
                     </div>
              </AgoraRTCProvider>
       );
}

function Videos(props: { channelName: string; AppID: string }) {
       const { AppID, channelName } = props;
       const { isLoading: isLoadingMic, localMicrophoneTrack } =
              useLocalMicrophoneTrack();
       const { isLoading: isLoadingCam, localCameraTrack } = useLocalCameraTrack();
       const remoteUsers = useRemoteUsers();
       const { audioTracks } = useRemoteAudioTracks(remoteUsers);

       usePublish([localMicrophoneTrack, localCameraTrack]);
       useJoin({
              appid: AppID,
              channel: channelName,
              token: null,
       });

       audioTracks.map((track) => track.play());
       const deviceLoading = isLoadingMic || isLoadingCam;
       if (deviceLoading)
              return (
                     <div className="flex flex-col items-center pt-40">Loading</div>
              );
       const unit = "minmax(0, 1fr) ";

       return (
              <div className="flex flex-col justify-between w-full h-screen p-10 rounded-xl pb-20">
                     <div
                            className={`flex gap-4 rounded-xl flex-1`}
                            style={{
                                   gridTemplateColumns:
                                          remoteUsers.length > 9
                                                 ? unit.repeat(4)
                                                 : remoteUsers.length > 4
                                                        ? unit.repeat(3)
                                                        : remoteUsers.length > 1
                                                               ? unit.repeat(2)
                                                               : unit,
                            }}
                     >
                            <div className="h-[170px] w-[250px] rounded-lg fixed z-10 bottom-0 right-0 flex justify-center m-16 mb-24">
                                   <LocalVideoTrack
                                          track={localCameraTrack}
                                          play={true}
                                          className="w-full h-full"
                                   />
                            </div>
                            {remoteUsers.map((user) => (
                                   <RemoteUser key={user.uid} user={user} />
                            ))}
                     </div>
              </div>
       );
}

export default Call;