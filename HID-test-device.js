
// Generic HID joystik-button implementation 
function testDevice() {
    this.controller = new HIDController();

    this.registerInputPackets = function() {
        packet = new HIDPacket("control",[0x1,0x0,0x0],9);
        packet.addControl("hid","keycode_1",3,"B");
        packet.addControl("hid","keycode_2",4,"B");
        packet.addControl("hid","keycode_3",5,"B");
        packet.addControl("hid","keycode_4",6,"B");
        packet.addControl("hid","keycode_5",7,"B");
        packet.addControl("hid","keycode_6",8,"B");
        this.controller.registerInputPacket(packet);
    }

    // HID joystik-button have no output controls
    this.registerOutputPackets = function() { }

    // No need to do scaling for joystik-button presses
    this.registerScalers = function() { }

    // Example to bind the bytes to a callback
    this.registerCallbacks = function() { 
        this.controller.setCallback("control","hid","keycode_1",this.keyPress);
        this.controller.setCallback("control","hid","keycode_2",this.keyPress);
        this.controller.setCallback("control","hid","keycode_3",this.keyPress);
        this.controller.setCallback("control","hid","keycode_4",this.keyPress);
        this.controller.setCallback("control","hid","keycode_5",this.keyPress);
        this.controller.setCallback("control","hid","keycode_6",this.keyPress);
    }

    // Example to do something with the joystik-button received
    this.keyPress = function(field) {
        if (field.value!=0) 
            HIDDebug("KEY PRESS " + field.id + " CODE " + field.value);
        else
            HIDDebug("KEY RELEASE " + field.id); 
    }
}

