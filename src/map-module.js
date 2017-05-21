// module "map-module.js"

var map;

function getNonZeroRandomNumber() {
    var random = Math.floor(Math.random() * 199) - 99;
    if (random == 0) return getNonZeroRandomNumber();
    return random;
}

function drawMap(route_shape, route_id) {
    // console.log("map",map);
    
    if(map){
        map.remove();
    }

    var currentVehicles = [];

    var firstTime = false;
    // L.RotatedMarker=L.Marker.extend( {
    //   options: { angle: 0, offset: { x:-34 / 2, y: -48 / 2 } },
    //   _setPos: function(pos) {
    //     L.Marker.prototype._setPos.call(this, pos);
    //     this._icon.style[L.DomUtil.TRANSFORM] +=' rotate(' + this.options.angle + 'deg)';
    //   }
    // }

    // );
    var pubnub = new PubNub({
        publishKey: 'pub-c-1b748bbe-e0a3-4965-9248-10ae2d9e98bf',
        subscribeKey: 'sub-c-f5d10302-3687-11e7-b860-02ee2ddab7fe'
    });
    var channel = 'pubnub-mapbox' + getNonZeroRandomNumber();
    map = eon.map({
        // debug: true,
        pubnub: pubnub,
        id: 'map',
        mbToken: 'pk.eyJ1IjoiaWFuamVubmluZ3MiLCJhIjoiZExwb0p5WSJ9.XLi48h-NOyJOCJuu1-h-Jg',
        mbId: 'ianjennings.l896mh2e',
        channels: [channel],
        connect: connect,
        options: {
            zoomAnimation: false,
        },
        message: function(data) {
            // console.log("inside message function");
            if (!firstTime) {
                // console.log(JSON.stringify(data,null,4));
                map.setView(data[0].latlng, 11);
            }
            firstTime = true;

            /* Update marker */
            // console.log("currentVehicles", JSON.stringify(currentVehicles,null,4));
            // console.log(map);
            // console.log("this",this.marker());
            // console.log(JSON.stringify(data,null,4));
            // var _self = this; // the map instance
            // data.forEach(function(obj) {
            //     _self.marker(obj.latlng, obj.data); // update marker ???
            // });


        },
        rotate: false,
        marker: function(latlng, data) {
            // console.log("latlng",JSON.stringify(latlng,null,4));
            // console.log("data",JSON.stringify(data,null,4));
            // console.log("Inside marker function!!!!!!");
            var marker = new L.Marker(latlng, {
                //offset: [-34 / 2, -48 / 2 ],
                icon: L.icon({
                    iconUrl: '/images/bus_icon_small.png',
                    iconSize: [34, 48],
                    iconAnchor: [34 / 2, 48], // see: https://www.mapbox.com/mapbox.js/api/v3.0.1/l-icon/
                    popupAnchor: [0, -48]
                })
            });

            var direction_label = (data.direction === 1) ? "Inbound" : "Outbound";
            marker.bindPopup("<strong>Trip ID: </strong>" + data.trip_id +
                "<br><strong>Bus ID: </strong>" + data.id +
                "<br><strong>Direction: </strong>" + direction_label); 

            return marker;
        }
    });

    L.control.scale().addTo(map);

    // var latLngs = paths.features[0].geometry.coordinates;
    // latLngs.forEach(function(latLng) { latLng.reverse(); });
    // var layer = L.geoJson(route2_paths, {
    //     color: "#F58426",
    //     weight: 3,
    //     opacity: 1
    // });
    // layer.addTo(map);

    var layer2 = L.geoJson(route_shape, {
        color: "#F58426",
        weight: 3,
        opacity: 1
    });
    layer2.addTo(map);



    function publishData(point) {
        // var url = "https://realtime.mbta.com/developer/api/v2/vehiclesbyroutes?api_key=wX9NwuHnZU2ToO7GmGR9uw&routes=751&format=json";
        // var route_id = 2;
        var url = `https://viaapi.gear.host/Buses/GetByRouteId?routeId=${route_id}`;
        $.get(url, function(response) {
                /* success */
                var data = JSON.parse(response);
                // console.log(JSON.stringify(data,null,4));
                
                var vehicles = data.map(function(obj){
                    // console.log(obj.vehicle.position);
                    return {
                        id: obj.id,
                        trip_id: obj.vehicle.trip.trip_id,
                        direction: obj.vehicle.trip.direction_id,
                        vehicle_lat: obj.vehicle.position.latitude,
                        vehicle_lon: obj.vehicle.position.longitude
                    } 
                });
                
                // console.log("vehicles",JSON.stringify(vehicles,null,4));
      

                var torchys = vehicles.map(function(obj){
                    return {
                        latlng: [obj.vehicle_lat, obj.vehicle_lon],
                        data: {
                            id: obj.id,
                            trip_id: obj.trip_id,
                            direction: obj.direction
                        }
                    }
                });
                
                // console.log("torchys", JSON.stringify(torchys,null,4));
                // var torchys = vehicles.map(function(obj) {
                //         if (currentVehicles.indexOf(obj.vehicle_id) < 0) {
                //             currentVehicles.push(obj.vehicle_id);
                //         }
                //         // console.log("currentVehicles", JSON.stringify(currentVehicles,null,4));

                //         return {
                //             latlng: [obj.vehicle_lat, obj.vehicle_lon],
                //             data: {
                //                 name: obj.trip_name,
                //                 headsign: obj.trip_headsign,
                //                 label: obj.vehicle_label,
                //                 id: obj.vehicle_id,
                //                 direction: obj.direction_name
                //             }
                //         }
                //     })
                //     // console.log("torchys", JSON.stringify(torchys,null,4));

                pubnub.publish({
                    channel: channel,
                    // message: [new_point],
                    // message: new_torchys
                    message: torchys
                });
            })
            .fail(function(error) {
                /* error */
                console.log(error.statusText);
            });
    }

    function connect() {
        var point = {
            latlng: [29.429095,-98.5061646],
            data: []
        };


        publishData(point);
        setInterval(function() {
            publishData(point);
        }, 1000);


    }

}

function drawRoute(){
    
}

export {
    drawMap
};
