// based on the 
// Demo script to print events from apple bluetooth keyboard on OS/X
// Copyright (C) 2012, Ilkka Tuohela
// 
//

test = new testDevice();

test.init = function(id) {
    test.id = id;
    test.registerInputPackets();
    test.registerOutputPackets();
    test.registerScalers();
    test.registerCallbacks();
    HIDDebug("HID Test Initialized: " + test.id);
}

test.shutdown = function() {
    HIDDebug("HID Test Shutdown: " + test.id);
}

test.incomingData = function(data,length) {
    var controller = test.controller;
    if (controller==undefined) {
        HIDDebug("Error in script initialization: controller not found");
        return;
    }
    controller.parsePacket(data,length);
}

