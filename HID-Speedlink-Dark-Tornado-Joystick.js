// based on the 
// Demo script to print events from apple bluetooth keyboard on OS/X
// Copyright (C) 2012, Ilkka Tuohela
// 
//

SDTJoystickButtons = new SDTJoystickButtonsDevice();

SDTJoystickButtons.init = function(id) {
    SDTJoystickButtons.id = id;
    SDTJoystickButtons.registerInputPackets();
    SDTJoystickButtons.registerOutputPackets();
    SDTJoystickButtons.registerScalers();
    SDTJoystickButtons.registerCallbacks();
    HIDDebug("HID SDTJoystickButtons Initialized: " + SDTJoystickButtons.id);
}

SDTJoystickButtons.shutdown = function() {
    HIDDebug("HID SDTJoystickButtons Shutdown: " + SDTJoystickButtons.id);
}

SDTJoystickButtons.incomingData = function(data,length) {
    var controller = SDTJoystickButtons.controller;
    if (controller==undefined) {
        HIDDebug("Error in script initialization: controller not found");
        return;
    }
    controller.parsePacket(data,length);
}
