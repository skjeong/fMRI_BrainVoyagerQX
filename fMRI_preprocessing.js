/* 	Preprocessing of FMR data
	Script for BrainVoyager QX 2.6
	skj Sep 2013
*/

var ObjectsSubjPath = "C:/Documents and Settings/skj/Desktop/experiment/01/";
var counter;
var FmrNames = new Array(4);
var RunNames = new Array(4);
	
	RunNames[0] = "exp1";	
	RunNames[1] = "exp2";	
	RunNames[2] = "localizer1";		
	RunNames[3] = "localizer2";	


for (counter = 0; counter < RunNames.length; counter++)
	{
	FmrNames[counter] = ObjectsSubjPath + RunNames[counter] + "/" + RunNames[counter] + ".fmr";	

	var FmrProject = BrainVoyagerQX.OpenDocument(FmrNames[counter]);

	// Preprocessing step 1: Slice time correction
	FmrProject.CorrectSliceTiming(1,1);
	// ** change the first parameter if the number of slices is NOT ODD. (SIEMENS scanner--> odd number slices  : 1, even number slices : 2)
	// First param: Scan order 0  -> Ascending,  1  -> Asc-Interleaved,  2  -> Asc-Int2,   10 -> Descending,  11 -> Desc-Int,  12 -> Desc-Int2
	// Second param: Interpolation method: 0 -> trilinear, 1 -> cubic spline, 3 -> sinc
	ResultFileName = FmrProject.FileNameOfPreprocessdFMR;
	FmrProject.Close();
	FmrProject = BrainVoyagerQX.OpenDocument( ResultFileName );

	// Preprocessing step 2: 3D motion correction
	if (RunNames[counter] == "exp1")
		{
		FmrProject.CorrectMotionEx(1,1,1,100,0,0);	// from previous script
		//FmrProject.MotionCorrection3D();
		}

	// ** enter the name of the first funrtional run here
	if (RunNames[counter] != "exp1")
		{
		FmrProject.CorrectMotionTargetVolumeInOtherRunEx(ObjectsSubjPath+"/exp1_1_SCCAI_3DMCT_LTR.fmr", 1,1, 1, 100, 0, 0); // from previous script																				
  		//FmrProject.CorrectMotionTargetVolumeInOtherRun("car1.fmr", 1);
		}
	ResultFileName = FmrProject.FileNameOfPreprocessdFMR;  // the current doc (input FMR) knows the name of the automatically saved output FMR
	FmrProject.Close();            // close input FMR
	FmrProject = BrainVoyagerQX.OpenDocument( ResultFileName ); // Open motion corrected file (output FMR) and assign to our doc var

	// Linear trend removal
	FmrProject.LinearTrendRemoval();
	ResultFileName = FmrProject.FileNameOfPreprocessdFMR;  // the current doc (input FMR) knows the name of the automatically saved output FMR
	FmrProject.Close();            // close input FMR
	//FmrProject = BrainVoyagerQX.OpenDocument( ResultFileName ); // Open motion corrected file (output FMR) and assign to our doc var

	}

/*
function MotionCorrection(fmrname, targetvolume)
{
	var docFMR = BrainVoyagerQX.OpenDocument(fmrname);
 	docFMR.CorrectMotion(targetvolume); // new param: target volume, with "1" this is the same as: docFMR.MotionCorrection3D();
 
 	// for intra-session motion correction use this command (with approprate file name):
    	// docFMR.CorrectMotionTargetVolumeInOtherRun("run1.fmr", 1);
 
	 var ResultFileName = docFMR.FileNameOfPreprocessdFMR;
 	docFMR.Close();
	docFMR = BrainVoyagerQX.OpenDocument( ResultFileName );
}
*/
