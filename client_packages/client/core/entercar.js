function calcDist(v1, v2) {
    return mp.game.system.vdist(
        v1.x,
        v1.y,
        v1.z,
        v2.x,
        v2.y,
        v2.z
    );
}

mp.game.controls.useDefaultVehicleEntering = false;
var inputOn = true;


mp.events.add('inputEnabled', () => {
    inputOn = true;
});

mp.events.add('inputDisabled', () => {
    inputOn = false;
});

mp.keys.bind(
    70,
    false,
    () => {
        if (mp.gui.cursor.visible) return;
        if (inputOn == false) {
            return;
        }

        if (mp.players.local.vehicle === null) {
            let playerPos = mp.players.local.position;
            let vehHandle = mp.game.vehicle.getClosestVehicle(playerPos.x, playerPos.y, playerPos.z, 5, 0, 70);
            let vehicle = mp.vehicles.atHandle(vehHandle);

            var player = mp.players.local;
            var chatStatus = player.getVariable("chatOpened");

            if (chatStatus == "true") {
                return;
            }

            if (vehicle !== null) {
                mp.players.local.taskEnterVehicle(vehHandle, 5000, -1, 2.0, 1, 0);
            }
        }
    }
);

mp.keys.bind(
    71,
    false,
    () => {   
        if (mp.gui.cursor.visible) return;
        if (inputOn == false) {
            return;
        }

        if (mp.players.local.vehicle === null) {
            let playerPos = mp.players.local.position;
            let vehHandle = mp.game.vehicle.getClosestVehicle(playerPos.x, playerPos.y, playerPos.z, 5, 0, 70);
            let vehicle = mp.vehicles.atHandle(vehHandle);


            var player = mp.players.local;
            var chatStatus = player.getVariable("chatOpened");

            if (chatStatus == "true") {
                return;
            }


            if (vehicle !== null) {
                let seat_pside_r = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_pside_r"));
                let seat_pside_f = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_pside_f"));
                let seat_dside_r = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_dside_r"));
                let seat_r = vehicle.getWorldPositionOfBone(vehicle.getBoneIndexByName("seat_r"));

                let distance = calcDist(playerPos, seat_pside_r);
                let seat = 2;
                if (vehicle.isSeatFree(0) && calcDist(playerPos, seat_pside_f) < distance) {
                    distance = calcDist(playerPos, seat_pside_f);
                    seat = 0;
                }
                if (vehicle.isSeatFree(1) && calcDist(playerPos, seat_dside_r) < distance) {
                    distance = calcDist(playerPos, seat_dside_r);
                    seat = 1;
                }
                if (vehicle.isSeatFree(3) && calcDist(playerPos, seat_r) < distance) {
                    seat = 3;
                }

                if (vehicle.isSeatFree(seat))
                    mp.players.local.taskEnterVehicle(vehHandle, 5000, seat, 2.0, 1, 0);
            }
        }
    }
);
