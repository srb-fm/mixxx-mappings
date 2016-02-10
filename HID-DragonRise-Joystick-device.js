
// Generic HID joystik-button implementation 
function DRJoystickButtonsDevice() {
	this.controller = new HIDController();

	this.registerInputPackets = function() {
		packet = new HIDPacket("control",[],8);
		//packet.addControl("hid","BTN_TRIGGER",5,"B","31");
		packet.addControl("[Channel1]","BTN_TRIGGER",5,"B","31");
		packet.addControl("[Channel2]","BTN_THUMB",5,"B","47");
		packet.addControl("[Sampler1]","BTN_THUMB2",5,"B","79");
		packet.addControl("[Sampler2]","BTN_TOP",5,"B","143");
		packet.addControl("[Sampler3]","BTN_TOP2",6,"B","1");
		this.controller.registerInputPacket(packet);
    }

	// HID joystik-button have no output controls
	this.registerOutputPackets = function() { }

	// No need to do scaling for joystik-button presses
	this.registerScalers = function() { }

	// Example to bind the bytes to a callback
	this.registerCallbacks = function() { 
		//this.controller.setCallback("control","hid","BTN_TRIGGER",this.btnPlay1);
		this.controller.setCallback("control","[Channel1]","BTN_TRIGGER",this.btnPlay);
		this.controller.setCallback("control","[Channel2]","BTN_THUMB",this.btnPlay);
		this.controller.setCallback("control","[Sampler1]","BTN_THUMB2",this.btnSampler);
		this.controller.setCallback("control","[Sampler2]","BTN_TOP",this.btnSampler);
		this.controller.setCallback("control","[Sampler3]","BTN_TOP2",this.btnSampler);
    }

	// Example to do something with the joystik-button received
	this.keyPress = function(field) {
		if (field.value!=0) 
			HIDDebug("Button PRESS " + field.id + " CODE " + field.value);
			if (field.value==31) 
				HIDDebug("Button ...1 ................." );
			if (field.value==47) 
				HIDDebug("Button ...2 ................." );
		else
			HIDDebug("Button RELEASE " + field.id); 
    }
    
	this.btnPlay = function(field) {
		HIDDebug(":::::::::::::::::Button Play 1 " + field.group + "--" + field.value );
		//engine.setValue("[Channel1]","play",1);
		//var status = (engine.getValue("[Channel1]","play")) ? false : true;
		if (field.value==31 || field.value==47) 
			HIDDebug(":::::::::::::::::player push ON " );
			//engine.setValue(field.group,"play",1);
		else
			return;
			
		var status = (engine.getValue(field.group,"play")) ? false : true;
		if (!status) {
			//HIDDebug(":::::::::::::::::player true " + field.group );
			engine.setValue(field.group,"stop",1);
			engine.setValue("[Playlist]","SelectNextTrack",1);
			engine.setValue(field.group,"LoadSelectedTrack",1);
		} else {
			//HIDDebug(":::::::::::::::::player false " );
			engine.setValue(field.group,"play",1);
		//if (field.value==15) 
			//engine.setValue(field.group,"stop",1);
			//engine.setValue("[Playlist]","SelectNextTrack",1);
			//engine.setValue(field.group,"LoadSelectedTrack",1);
		}
    }

	this.btnSampler = function(field) {
		//HIDDebug(":::::::::::::::::Button Sampler Play 1 " + field.group + "--" + field.value );
		//engine.setValue("[Sampler1]","play",1);

		if (field.value==79 || field.value==143 || field.value==1) 
			HIDDebug(":::::::::::::::::sampler push ON " );
		else
			return;

		//var status = (engine.getValue("[Sampler1]","play")) ? false : true;
		var status = (engine.getValue(field.group,"play")) ? false : true;
		if (!status) {
			//HIDDebug(":::::::::::::::::sampler true " );
			//engine.setValue("[Sampler1]","stop",1);
			engine.setValue(field.group,"stop",1);
		} else {
			//HIDDebug(":::::::::::::::::sampler false " );
			//engine.setValue("[Sampler1]","play",1);
			engine.setValue(field.group,"start_play",1);
		}
    }
}