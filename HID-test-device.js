
// Generic HID joystik-button implementation 
function testDevice() {
    this.controller = new HIDController();

    this.registerInputPackets = function() {
        packet = new HIDPacket("control",[],8);
        packet.addControl("hid","BTN_TRIGGER",5,"B","31");
	packet.addControl("hid","BTN_THUMB",5,"B","47");
	packet.addControl("hid","BTN_THUMB2",5,"B","79");
	packet.addControl("hid","BTN_TOP",5,"B","143");
	packet.addControl("hid","BTN_TOP2",6,"B","1");
        this.controller.registerInputPacket(packet);
    }

    // HID joystik-button have no output controls
    this.registerOutputPackets = function() { }

    // No need to do scaling for joystik-button presses
    this.registerScalers = function() { }

    // Example to bind the bytes to a callback
    this.registerCallbacks = function() { 
        this.controller.setCallback("control","hid","BTN_TRIGGER",this.keyPress);
        this.controller.setCallback("control","hid","BTN_THUMB",this.keyPress);
        this.controller.setCallback("control","hid","BTN_THUMB2",this.keyPress);
        this.controller.setCallback("control","hid","BTN_TOP",this.keyPress);
        this.controller.setCallback("control","hid","BTN_TOP2",this.keyPress);
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
}

