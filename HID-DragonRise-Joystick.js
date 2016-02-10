// based on the 
// Demo script to print events from apple bluetooth keyboard on OS/X
// Copyright (C) 2012, Ilkka Tuohela
// 
//

DRJoystickButtons = new DRJoystickButtonsDevice();

DRJoystickButtons.init = function(id) {
    DRJoystickButtons.id = id;
    DRJoystickButtons.registerInputPackets();
    DRJoystickButtons.registerOutputPackets();
    DRJoystickButtons.registerScalers();
    DRJoystickButtons.registerCallbacks();
    HIDDebug("HID DRJoystickButtons Initialized: " + DRJoystickButtons.id);
}

DRJoystickButtons.shutdown = function() {
    HIDDebug("HID DRJoystickButtons Shutdown: " + DRJoystickButtons.id);
}

DRJoystickButtons.incomingData = function(data,length) {
    var controller = DRJoystickButtons.controller;
    if (controller==undefined) {
        HIDDebug("Error in script initialization: controller not found");
        return;
    }
    controller.parsePacket(data,length);
}
