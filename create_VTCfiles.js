/* 	Create VTC files
	Script for BrainVoyager QX 2.6
	skj Sep 2013
*/

var ObjectsSubjPath = "C:/Documents and Settings/skj/Desktop/experiment/01/";
var counter;
var FmrNames = new Array(4);
var RunNames = new Array(4);
var nameVTCinNative = new Array(4);
var ProtocolNames = new Array(4);
	
	// Array Num starts from 0
	RunNames[0] = "exp1";	
	RunNames[1] = "exp2";	
	RunNames[2] = "localizer1";		
	RunNames[3] = "localizer2";		

	ProtocolNames[0] = "prt_exp1.prt"
	ProtocolNames[1] = "prt_exp2.prt"
	ProtocolNames[2] = "prt_localizer1.prt"
	ProtocolNames[3] = "prt_localizer2.prt"

	var nameVMRinNative = ObjectsSubjPath +"AnatomicalPresets/ana2_ISO.vmr";
	var nameIAfile = ObjectsSubjPath + "exp1_SCCAI_3DMCT_LTR-TO-ana2_ISO_IA.trf";
	var nameFAfile = ObjectsSubjPath + "exp1_SCCAI_3DMCT_LTR-TO-ana2_ISO_FA.trf";
//  // UNCOMMENT  when using Talairach brain
//	var nameACPCfile = ObjectsRawDataPath + "CG_3DT1MPR_SCRIPT_IIHC_aACPC.trf";
//	var nameTALfile = ObjectsRawDataPath + "CG_3DT1MPR_SCRIPT_IIHC_aACPC.tal";

	var dataType = 2; // 1: int16, 2: float32
	var resolution = 3; // one of 1, 2 or 3 mm^2
	var interpolation = 1; 
	var threshold = 100; 
	var extendedBoundingBox = false;

for (counter = 0; counter < RunNames.length; counter++)
	{
		
		FmrNames[counter] = ObjectsSubjPath + RunNames[counter] + "/" + RunNames[counter] + "_SCCAI_3DMCT_LTR.fmr";	// Array Num starts from 0
		nameVTCinNative[counter] = ObjectsSubjPath + RunNames[counter] + "/" + RunNames[counter] + ".vtc";	// Array Num starts from 0

		var docFMR = BrainVoyagerQX.OpenDocument(FmrNames[counter]);
		docFMR.LinkStimulationProtocol( ObjectsSubjPath + "functional_data/" + ProtocolNames[counter]);
		docFMR.Save();      

		var docVMR = BrainVoyagerQX.OpenDocument(nameVMRinNative);
		docVMR.ExtendedTALSpaceForVTCCreation = false; // this is true or false
		var success = docVMR.CreateVTCInVMRSpace(FmrNames[counter], nameIAfile, nameFAfile, nameVTCinNative[counter], dataType, resolution, interpolation, threshold);
		// ** This is for NATIVE space. Use "CreateVMRinTalairachSpace" when you're using Talairach brain (see below..)
		docFMR.Close();

	}

/*
	function CreateVMRinNativeSpace() 
	{
		var docVMR = BrainVoyagerQX.OpenDocument(nameVMRinNative);
		docVMR.ExtendedTALSpaceForVTCCreation = false; // this is true or false
		var success = docVMR.CreateVTCInVMRSpace(nameFMR, nameIAfile, nameFAfile, nameVTCinNative, dataType, resolution, interpolation, threshold);
		docVMR.Close();
	}

	function CreateVMRinTalairachSpace(useExtendedBoundingBox) 
	{
		var docVMR = BrainVoyagerQX.OpenDocument(nameVMRinNative);
		docVMR.ExtendedTALSpaceForVTCCreation = useExtendedBoundingBox; // this is true or false

		// new in v2.4.1: specify bounding box for target VTC (works for any target reference space)
		docVMR.UseBoundingBoxForVTCCreation = true; // use bounding box
		// use properties to read and set bounding box values (here we create VTC only in lower posterior part of brain):
		docVMR.TargetVTCBoundingBoxZStart = 110; // values will be adjusted to fit on multiple of resolution
		docVMR.TargetVTCBoundingBoxZEnd  = 150; // values not changed (here X/Y) use default (TAL) bounding box values
		docVMR.TargetVTCBoundingBoxYStart = 128;

		var success = docVMR.CreateVTCInTALSpace(nameFMR, nameIAfile, nameFAfile, nameACPCfile, nameTALfile, nameVTCinTAL, dataType, resolution, interpolation, threshold);
		
		docVMR.Close();

		var docVMRTAL = BrainVoyagerQX.OpenDocument(nameVMRinTAL);
		docVMRTAL.LinkVTC(nameVTCinTAL);
	}

	function CreateVMRinAcpcSpace() 
	{
		var docVMR = BrainVoyagerQX.OpenDocument(nameVMRinNative);
		docVMR.ExtendedTALSpaceForVTCCreation = false; // this is true or false
		var success = docVMR.CreateVTCInACPCSpace(nameFMR, nameIAfile, nameFAfile, nameACPCfile, nameVTCinACPC, dataType, resolution, interpolation, threshold);
		docVMR.Close();
	}


*/
