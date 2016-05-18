var tag = true;
if(tag){
	var meet_config={
		url:{
			signcode:'/gome-manager-web/meeting/validateMeetCode',
			sign:'/gome-manager-web/meetManager/signMeetJionPerson',
			welcome:'/gome-manager-web/meetManager/queryWelcomeLetter',
			expert:'/gome-manager-web/professor/queryMeetingProfessor',
			schedule:'/gome-manager-web/meetingSchedule/querySchedule',
			data:'/gome-manager-web/meetingData/queryData',
			senddata:'/gome-manager-web/meetingData/downloadFile',
			getask:'/gome-manager-web/meetingInteract/addInteract',
			ask:'/gome-manager-web/meetingInteract/queryOnWall',
			vote:'/gome-manager-web/meetingVote/addVote',
			isvote:'/gome-manager-web/meetingVote/queryVoteStatus'
		}
	}
}else{
	var meet_config={
		url:{
			signcode:'/json/signcode.js',
			sign:'/json/sign.js',
			welcome:'/json/welcome.js',
			expert:'/json/expert.js',
			schedule:'/json/schedule.js',
			data:'/json/data.js',
			senddata:'/json/data.js',
			getask:'/json/ask.js',
			ask:'/json/data.js',
			vote:'/json/data.js',
			isvote:'/json/data.js'
		}
	}
}

