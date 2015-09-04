/* 	Create FMR projects
	Script for BrainVoyager QX 2.6
	skj Sep 2013
*/

BrainVoyagerQX.PrintToLog("Create mosaic FMR project...");
Create_Mosaic_FMR_Project();

function Create_Mosaic_FMR_Project()
{
	
	var RunNums = new Array(4);
	var RunName = new Array(4);

	RunNums[0] = "1";
	RunNums[1] = "2";
	RunNums[2] = "3";
	RunNums[3] = "4";

	RunName[0] = "exp1";	
	RunName[1] = "exp2";	
	RunName[2] = "localizer1";	
	RunName[3] = "localizer2";	

	var ObjectsSubjPath = "C:/Documents and Settings/skj/Desktop/experiment/01/";
	var SubjName = "##";
//	var SubjNum = "2";

	for (RunCounter =0; RunCounter < RunNums.length; RunCounter++)
	{
	    var FmrPath = ObjectsSubjPath + RunName[RunCounter] + "/";
	    var docFMR = BrainVoyagerQX.CreateProjectMosaicFMR("DICOM", ObjectsSubjPath + "data/" + SubjName + "-00" + RunNums[RunCounter] + "-0001-00001.dcm",140, 2, true, 31, "untitled-", false, 432, 432, 2, FmrPath, 1, 72, 72 );
		// ** change # of TR, # of slices, and resolution here

		// docFMR.LinkStimulationProtocol( FmrPath + "car1_prt_s" + SubjNum + "_run" + RunCounter + ".prt" );
    	 docFMR.SaveAs(FmrPath + RunName[RunCounter] +".fmr" );
	    docFMR.Close();

	}
}


