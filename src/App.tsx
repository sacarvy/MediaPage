// change file name to APP when to see in action!
import { createMemo, Index, Accessor, createSignal, createEffect, on, Show } from "solid-js";
import type { Component } from "solid-js";
import { FileExplorer as FolderExplorer, RenamingHandler } from "./components/FileExplorer";
import store, { closeFile, createNewFolder, focusFile, get, removeFile } from "./components/store/FileExplorer";
import { AddBtn } from "./components/parts/Btns";
import { Portal } from "solid-js/web";
import { RecorderDialog } from "./VideoRecorder";

// const fetchToken = async () => await axiosAPI.post('auth', { email: "sukhpreetben10@gmail.com" })

const App: Component = () => {
	const mimeType = "audio/webm";

	// Todo implement Stack in here
	const fileTabs = createMemo(() => {
		let bu: Array<{ folderId: string; fileId: string; name: string; isactive: boolean }> = [];
		store.foldersDetails?.forEach((e) =>
			e.files.forEach((b) => (b.isopen ? (bu = [...bu, { name: b.name, fileId: b.id, folderId: e.id, isactive: b.isactive }]) : null))
		);
		return bu;
	});
	const [videoModel, setVideoModel] = createSignal(false);
	const [mediaBlobURL,setMediaBlobURL] = createSignal<string>('https://mp4-b.udemycdn.com/2015-08-04_07-44-21-a367ad73645b9ac4fb6ef9da9b34f436/WebHD_1080.mp4?secure=GhS3fRImq8mGq4L03hFSow%3D%3D%2C1647516674');
	const closeVideoModel = () => setVideoModel(false);
	const openVideoModel = () => setVideoModel(true);
	createEffect( on(mediaBlobURL,(v,p)=>{
		if (typeof p === 'string' )
			URL.revokeObjectURL(p);
		console.log(p);
		return mediaBlobURL();
	}))	
	return (
		<div class="w-full min-h-screen bg-slate-900 flex">
			<main class="w-max border-r-2 h-full min-h-screen flex flex-col items-start">
				<FoldersPreview />
			</main>
			<section class="w-full flex flex-col items-start h-screen">
				<FileExplorer fileTabsData={fileTabs} />
				<div id="files-tabs-wrapper" class="w-full flex-none">
					<article class="flex border-b-2 w-full">
						<div class="p-3 text-white">
							<svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M24.9736 0.627441H8.97363C7.50697 0.627441 6.30697 1.82744 6.30697 3.29411V19.2941C6.30697 20.7608 7.50697 21.9608 8.97363 21.9608H24.9736C26.4403 21.9608 27.6403 20.7608 27.6403 19.2941V3.29411C27.6403 1.82744 26.4403 0.627441 24.9736 0.627441ZM3.6403 5.96077H0.973633V24.6274C0.973633 26.0941 2.17363 27.2941 3.6403 27.2941H22.307V24.6274H3.6403V5.96077Z"
									fill="#7097FB"
								/>
								<path
									d="M12.3486 5.1862V16.4837C12.3486 17.3452 13.2974 17.8686 14.028 17.3997L22.9046 11.751C23.06 11.6526 23.188 11.5165 23.2767 11.3554C23.3654 11.1943 23.4119 11.0134 23.4119 10.8295C23.4119 10.6456 23.3654 10.4646 23.2767 10.3035C23.188 10.1424 23.06 10.0064 22.9046 9.90802L14.028 4.27019C13.8635 4.1638 13.6734 4.10378 13.4776 4.09646C13.2819 4.08914 13.0878 4.13479 12.9158 4.22859C12.7438 4.32239 12.6004 4.46087 12.5005 4.62941C12.4007 4.79795 12.3482 4.99031 12.3486 5.1862Z"
									fill="white"
								/>
							</svg>
						</div>
						<div class="p-3 text-white">
							<svg width="32" height="32" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path
									d="M24.9736 0.627441H8.97363C7.50697 0.627441 6.30697 1.82744 6.30697 3.29411V19.2941C6.30697 20.7608 7.50697 21.9608 8.97363 21.9608H24.9736C26.4403 21.9608 27.6403 20.7608 27.6403 19.2941V3.29411C27.6403 1.82744 26.4403 0.627441 24.9736 0.627441ZM22.307 7.29411H18.307V14.6274C18.307 15.5115 17.9558 16.3593 17.3307 16.9845C16.7055 17.6096 15.8577 17.9608 14.9736 17.9608C14.0896 17.9608 13.2417 17.6096 12.6166 16.9845C11.9915 16.3593 11.6403 15.5115 11.6403 14.6274C11.6403 13.7434 11.9915 12.8955 12.6166 12.2704C13.2417 11.6453 14.0896 11.2941 14.9736 11.2941C15.7336 11.2941 16.4136 11.5474 16.9736 11.9741V4.62744H22.307V7.29411ZM3.6403 5.96077H0.973633V24.6274C0.973633 26.0941 2.17363 27.2941 3.6403 27.2941H22.307V24.6274H3.6403V5.96077Z"
									fill="#CAE8FD"
								/>
							</svg>
						</div>
					</article>
				</div>
				<article class="grow shrink w-full p-2 flex flex-col border-b-2">
					<div class="
							w-full
							bg-white
							shadow-2xl
							shadow-[rgba(96,165,250,0.05)]
							backdrop-blur-xl
							rounded-2xl
							grow
							shrink
							overflow-y-auto
							flex items-center justify-center
							overflow-x-hidden
					">
					<Show when={mediaBlobURL()}>
						<video class="h-80 rounded-xl" src={mediaBlobURL()} controls autoplay loop ></video>
					</Show>
					</div>
				</article>
				<article id="video-controllers-group" class="flex-none border-b-2 flex flex-col w-full h-40 overflow-auto">
					<div id="video-primary-action-group" class="w-full flex place-content-between border-b-2 p-2">
						<div>
							<button
								onClick={openVideoModel}
								class="text-indigo-500 bg-white hover:text-indigo-50 hover:bg-indigo-500 w-max h-max px-2 py-1 rounded-lg hover:scale-105 active:scale-110 transition-[colors,transform]">
								<span class="leading-6 ">Create video</span>
							</button>
							{/* <button class="bg-indigo-500 px-2 py-1 text-white rounded-lg">Record Video</button> */}
						</div>
						<div class="flex text-white items-center gap-x-2">
							<span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
								</svg>
							</span>
							<div class="flex items-center gap-x-3">
								<span>
									<svg width="21" height="26" viewBox="0 0 21 26" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M0.703129 2.8373V23.3538C0.703129 24.9183 2.42604 25.8688 3.75288 25.0173L19.873 14.759C20.1552 14.5804 20.3877 14.3334 20.5488 14.0408C20.7098 13.7482 20.7943 13.4196 20.7943 13.0856C20.7943 12.7517 20.7098 12.4231 20.5488 12.1305C20.3877 11.8379 20.1552 11.5908 19.873 11.4122L3.75288 1.1738C3.45418 0.980604 3.10887 0.87161 2.75339 0.858315C2.3979 0.84502 2.04542 0.927917 1.73312 1.09826C1.42082 1.2686 1.16029 1.52008 0.979008 1.82616C0.797726 2.13223 0.702415 2.48157 0.703129 2.8373Z"
											fill="white"
										/>
									</svg>
								</span>
								<span>00:00</span>
							</div>
							<span>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2">
									<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</div>
						<div>
							<button class="bg-indigo-800 px-2 py-1 text-indigo-400 rounded-lg">Generate Video</button>
						</div>
					</div>
					<div id="time-marker" class="flex">
						<div id="left-col-of-data" class="flex flex-col w-40">
							<div id="spacer" class="h-7 border-r-2"></div>
							<button class="border-y-2 flex items-start px-3 py-1 border-r-2">
								<span class="text-white">
									Video Data
								</span>
							</button>
							<div id="spacer" class="h-3 border-r-2"></div>
							<button class="border-y-2 flex items-start px-3 py-1 border-r-2">
								<span class="text-white">
									Video Data
								</span>
							</button>
							<div id="spacer" class="h-3 border-r-2"></div>
						</div>
						<div class="grow">
							<div id="timemarkkercontainer" ref={(el) => {
								el.addEventListener('mousedown',()=>{
									console.log("mouseover")
								})
							}} class="h-7 flex items-center">
								<div class="relative w-0 h-0 border-8 border-x-transparent border-b-transparent">
									<div class="h-28 absolute -left-px -top-0.5 bg-white w-0.5"></div>
								</div>
							</div>
							<div class="border-y-2 flex items-start px-3 py-1 border-r-2">
								<span class="text-white">
									Video Data
								</span>
							</div>
						</div>
					</div>
				</article>
			</section>
			<Show when={videoModel()}>
				<Portal>
					<RecorderDialog closeEvent={closeVideoModel} setBlobURL={setMediaBlobURL} />
				</Portal>
			</Show>
		</div>
	);
};

const FoldersPreview = () => {
	return (
		<section id="Container" class="bg-slate-900">
			<header class="border-b-2">
				<div class="flex items-center justify-between px-4 py-1.5">
					<h1 class="text-white text-xl font-bold">AI VIDEOS</h1>
					<AddBtn
						class="text-white"
						onClick={() => {
							let folderId = createNewFolder("newfolder");
							RenamingHandler(null, {
								inisialText: "",
								placeholder: "name of folder",
								folderId,
							});
						}}
					/>
				</div>
			</header>
			<nav class="w-64 h-full">
				<FolderExplorer />
			</nav>
		</section>
	);
};

const FileExplorer = (props: {
	fileTabsData: Accessor<
		{
			folderId: string;
			fileId: string;
			name: string;
			isactive: boolean;
		}[]
	>;
}) => {
	const fileTabs = props.fileTabsData;
	return (
		<div id="tabs-wrapper" class="w-full border-b-2 flex-none">
			<article class="flex gap-x-1">
				<div class="p-2 text-white">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						class="iconify iconify--ph"
						width="24"
						height="24"
						preserveAspectRatio="xMidYMid meet"
						viewBox="0 0 256 256">
						<path
							fill="currentColor"
							d="M241.9 110.6a16.2 16.2 0 0 0-13-6.6H216V88a16 16 0 0 0-16-16h-69.3l-27.8-20.8a15.6 15.6 0 0 0-9.6-3.2H40a16 16 0 0 0-16 16v144a8.2 8.2 0 0 0 1.4 4.5A7.9 7.9 0 0 0 32 216h176a8 8 0 0 0 7.6-5.5l28.5-85.4a16.3 16.3 0 0 0-2.2-14.5ZM93.3 64l27.8 20.8a15.6 15.6 0 0 0 9.6 3.2H200v16h-53.6a16 16 0 0 0-8.9 2.7L117.6 120H69.4a15.7 15.7 0 0 0-14.8 10.1L40 166.5V64Z"></path>
					</svg>
				</div>
				<Index each={fileTabs()}>
					{(fileTab) => {
						const commonClass = "flex items-center justify-center mt-2";
						const attrs = (cls: string) => {
							return {
								class: commonClass + " " + cls,
								classList: {
									"bg-teal-100": fileTab().isactive,
									"bg-white": !fileTab().isactive,
								},
							};
						};
						return (
							<div class="flex">
								<button
									{...attrs("rounded-tl-md gap-x-3 px-3")}
									onClick={() => {
										focusFile(fileTab().folderId, fileTab().fileId);
									}}>
									<span class="">
										<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path
												d="M1.94645 3.36275H0.279785V16.6961H13.6131V15.0294H1.94645V3.36275ZM16.9465 0.0294189H3.61312V13.3628H16.9465V0.0294189ZM8.61312 10.4461V2.94609L13.6131 6.69609L8.61312 10.4461Z"
												fill="#4C8896"
											/>
										</svg>
									</span>
									<span class="">{fileTab().name}</span>
								</button>
								<div {...attrs("rounded-tr-md pl-0.5 pr-2")}>
									<button
										onClick={() => {
											closeFile(fileTab().folderId, fileTab().fileId);
										}}
										class="p-1">
										<span>
											<svg width="17" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path
													d="M14.1128 1.36267H5.11279C2.90365 1.36267 1.11279 3.15353 1.11279 5.36267V14.3627C1.11279 16.5718 2.90365 18.3627 5.11279 18.3627H14.1128C16.3219 18.3627 18.1128 16.5718 18.1128 14.3627V5.36267C18.1128 3.15353 16.3219 1.36267 14.1128 1.36267Z"
													stroke="#4C8896"
													stroke-width="2"
													stroke-linecap="round"
												/>
												<path
													d="M6.61279 6.86267L12.6128 12.8627M6.61279 12.8627L12.6128 6.86267L6.61279 12.8627Z"
													stroke="#4C8896"
													stroke-width="2"
													stroke-linecap="round"
													stroke-linejoin="round"
												/>
											</svg>
										</span>
									</button>
								</div>
							</div>
						);
					}}
				</Index>
				<div
					class="rounded-t-md p-1 flex items-center gap-x-3 mt-2"
					classList={{
						"mt-2": fileTabs().length !== 0,
					}}>
					<span class="text-white">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
						</svg>
					</span>
				</div>
			</article>
		</div>
	);
};

export default App;

{
	/* <button ref={(el) => (recordRef = el)} onClick={() => {
          console.log("RECORD");
          record();
        }} class="bg-white text-black">
					RECORD
				</button>
				<button ref={(el) => (stopRef = el)} onClick={() => {
          console.log("STOP");
          stop();
        }} class="">
					STOP
				</button> */
}
{
	/* <div ref={(el) => (soundClips = el)} onClick={stop} ></div> */
}
