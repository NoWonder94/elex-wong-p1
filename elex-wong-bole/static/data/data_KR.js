import dataGame from './data_KR/game.json';
import inquiry from './data_KR/inquiry.json';
import gameDetails from './data_KR/gameDetails.json';
import inquiryDetails from './data_KR/inquiryDetails.json';
import nationalList from './data_KR/nationalList.json';
import basic_Info from './data_KR/basic_Info.json';
import download_resource from './data_KR/download_resource.json';
import media_resource from './data_KR/media_resource.json';
import inquiry1 from './data_CN/inquiry.json';
let combined={
	"Game":dataGame,
	"Info":inquiry,
	"Game_Details":gameDetails,
	"Info_Details":inquiryDetails,
	"national":nationalList,
	"basic_Info":basic_Info,
	"download_resource":download_resource,
  "media_resource":media_resource,
  "Info1":inquiry,
}

export default combined
