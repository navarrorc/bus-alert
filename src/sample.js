  
    
    // <script>
    //   function getNonZeroRandomNumber(){
    //     var random = Math.floor(Math.random()*199) - 99;
    //     if(random==0) return getNonZeroRandomNumber();
    //     return random;
    //   }
    // </script>
    // <script>
    

    
    //   var currentVehicles = [];
      
    //   var firstTime = false;
    //   // L.RotatedMarker=L.Marker.extend( {
    //   //   options: { angle: 0, offset: { x:-34 / 2, y: -48 / 2 } },
    //   //   _setPos: function(pos) {
    //   //     L.Marker.prototype._setPos.call(this, pos);
    //   //     this._icon.style[L.DomUtil.TRANSFORM] +=' rotate(' + this.options.angle + 'deg)';
    //   //   }
    //   // }
      
    //   // );
    //   var pubnub = new PubNub({
    //     publishKey: 'pub-c-1b748bbe-e0a3-4965-9248-10ae2d9e98bf',
    //     subscribeKey: 'sub-c-f5d10302-3687-11e7-b860-02ee2ddab7fe'
    //   });
    //   var channel = 'pubnub-mapbox' + getNonZeroRandomNumber();
    //   var map = eon.map({
    //     // debug: true,
    //     pubnub: pubnub,
    //     id: 'map',
    //     mbToken: 'pk.eyJ1IjoiaWFuamVubmluZ3MiLCJhIjoiZExwb0p5WSJ9.XLi48h-NOyJOCJuu1-h-Jg',
    //     mbId: 'ianjennings.l896mh2e',
    //     channels: [channel],
    //     connect: connect,
    //     options: {
    //       zoomAnimation: false,
    //     },
    //     message: function (data) {
    //       console.log("inside message function");
    //       if(!firstTime) {
    //         // console.log(JSON.stringify(data,null,4));
    //         map.setView(data[0].latlng, 14);
    //       }
    //       firstTime = true;
          
    //       /* Update marker */
    //       // console.log("currentVehicles", JSON.stringify(currentVehicles,null,4));
    //       // console.log(map);
    //       // console.log("this",this.marker());
    //       // console.log(JSON.stringify(data,null,4));
    //       var _self = this; // the map instance
    //       data.forEach(function(obj){
    //         _self.marker(obj.latlng, obj.data); // update marker ???
    //       });
          
          
    //     },
    //     rotate: false,
    //     marker: function(latlng, data) {
    //       // console.log("latlng",JSON.stringify(latlng,null,4));
    //       // console.log("data",JSON.stringify(data,null,4));
    //       console.log("Inside marker function!!!!!!");
    //       var marker = new L.Marker(latlng, {
    //         //offset: [-34 / 2, -48 / 2 ],
    //         icon: L.icon({
    //           iconUrl: '/images/bus_icon_small.png',
    //           iconSize: [34, 48],
    //           iconAnchor: [34/2, 48], // see: https://www.mapbox.com/mapbox.js/api/v3.0.1/l-icon/
    //           popupAnchor: [0, -48]
    //         })
    //       });

    //       marker.bindPopup("<strong>Trip Name: </strong>" + data.name + 
    //         "<br><strong>Headsign: </strong>" + data.headsign + 
    //         "<br><strong>Vehicle ID: </strong>" + data.id +
    //         // "<br><strong>Label: </strong>" + data.label +
    //         "<br><strong>Direction: </strong>" + data.direction);

    //       return marker;
    //     }
    //   });
      
    //   L.control.scale().addTo(map);
      
    //   // var latLngs = paths.features[0].geometry.coordinates;
    //   // latLngs.forEach(function(latLng) { latLng.reverse(); });
    //   var layer = L.geoJson(route2_paths, {color: "#F58426", weight: 3, opacity: 1});
    //   layer.addTo(map);
      
    //   var layer2 = L.geoJson(dudley_paths, {color: "#F58426", weight: 3, opacity: 0.7});
    //   layer2.addTo(map);
      
      
      
    //   function publishData(point) {
    //     var url = "https://realtime.mbta.com/developer/api/v2/vehiclesbyroutes?api_key=wX9NwuHnZU2ToO7GmGR9uw&routes=751&format=json";
    //     $.get(url, function(response) {
    //         /* success */
    //         var directions = response.mode[0].route[0].direction; // Inbound and Outbound
    //         if(!directions) {
    //           console.log("no directions found!");
    //           return;
    //         }
            
    //         var trips = directions.map(function(obj){
    //           obj.trip[0].direction_name = obj.direction_name; // keeping track of the direction_name
    //           return obj.trip[0];
    //         });
            
    //         // console.log("trips", JSON.stringify(trips,null,4));
            
            
    //         // console.log("trips", JSON.stringify(trips,null,4));
            
    //         var vehicles = trips.map(function(obj){
    //           obj.vehicle.direction_name = obj.direction_name; // keeping track of the direction_name
    //           obj.vehicle.trip_name = obj.trip_name; // keeping track of the trip_name
    //           obj.vehicle.trip_headsign = obj.trip_headsign; // keeping track of the trip_headsign
    //           return obj.vehicle;
    //         });
            
    //         // console.log("vehicles", JSON.stringify(vehicles,null,4));
            
    //         var torchys = vehicles.map(function(obj){
    //           if (currentVehicles.indexOf(obj.vehicle_id) < 0){
    //             currentVehicles.push(obj.vehicle_id);
    //           }
    //           // console.log("currentVehicles", JSON.stringify(currentVehicles,null,4));
              
    //           return {
    //             latlng: [obj.vehicle_lat, obj.vehicle_lon],
    //             data: {
    //               name: obj.trip_name,
    //               headsign: obj.trip_headsign,
    //               label: obj.vehicle_label,
    //               id: obj.vehicle_id,
    //               direction: obj.direction_name
    //             }
    //           }
    //         })
    //         // console.log("torchys", JSON.stringify(torchys,null,4));
            
    //         // var torchys = [{
    //         //   latlng: [30.370375, -97.756138]
    //         // }, {
    //         //   latlng: [30.323118, -97.739144]
    //         // }, {
    //         //   latlng: [30.302816, -97.699490]
    //         // }, {
    //         //   latlng: [30.293479, -97.742405]
    //         // }, {
    //         //   latlng: [30.250337, -97.754593]
    //         // }, {
    //         //   latlng: [30.236689, -97.762730]
    //         // }];
            
    //         // var vehicle = response.vehicle;
    //         // var vehicle = response.mode[0].route[0].direction;
    //         // console.log(JSON.stringify(trip,null,4));
    //         // debugger;
            
    //         // var new_torchys = JSON.parse(JSON.stringify(torchys));
            
    //         // for (var i = 0; i < new_torchys.length; i++) {
    //         //   new_torchys[i] = {
    //         //     marker: new_torchys[i].marker,
    //         //     latlng: [
    //         //       new_torchys[i].latlng[0],
    //         //       new_torchys[i].latlng[1]
    //         //     ],
    //         //     data: {
    //         //       name: new_torchys[i].name,
    //         //       headsign: new_torchys[i].headsign,
    //         //       label: new_torchys[i].label,
    //         //       direction: new_torchys[i].direction
    //         //     }
    //         //   }
    //         // }
    //         // var lat = vehicle.vehicle_lat;
    //         // var lon = vehicle.vehicle_lon;
    //         // var new_point = JSON.parse(JSON.stringify(point));
    //         // new_point.data = [{
    //         //   trip_name: trip.trip_name,
    //         //   headsign: trip.trip_headsign,
    //         //   label: vehicle.vehicle_label
    //         // }];
    //         // new_point.latlng = [lat, lon];

    //         // console.log("[new_point]", JSON.stringify([new_point],null,4));
    //         pubnub.publish({
    //           channel: channel,
    //           // message: [new_point],
    //           // message: new_torchys
    //           message: torchys
    //         });
    //       })
    //       .fail(function(error) {
    //         /* error */
    //         console.log(error.statusText);
    //       });
    //   }
      
    //   function connect() {
    //     var point = {
    //       latlng: [37.370375, -97.756138],
    //       data: []
    //     };

        
    //     publishData(point);
    //     setInterval(function(){
    //       publishData(point);
    //     },1000);
        
    //     // //setInterval(function(){
    //     //   // var url = "https://realtime.mbta.com/developer/api/v2/vehiclesbytrip?api_key=wX9NwuHnZU2ToO7GmGR9uw&trip=33788361&format=json";
    //     //   var url = "https://realtime.mbta.com/developer/api/v2/vehiclesbyroutes?api_key=wX9NwuHnZU2ToO7GmGR9uw&routes=749&format=json";
    //     //   $.get(url, function(response) {
    //     //     /* success */
    //     //     var trip = response.mode[0].route[0].direction[0].trip[0];
    //     //     var vehicle = response.mode[0].route[0].direction[0].trip[0].vehicle;
    //     //     // var vehicle = response.vehicle;
    //     //     // var vehicle = response.mode[0].route[0].direction;
    //     //     // console.log(JSON.stringify(trip,null,4));

    //     //     var lat = vehicle.vehicle_lat;
    //     //     var lon = vehicle.vehicle_lon;
    //     //     var new_point = JSON.parse(JSON.stringify(point));
    //     //     new_point.data = [{trip_name: trip.trip_name}];
    //     //     new_point.latlng = [lat, lon];

    //     //     // console.log("[new_point]", JSON.stringify([new_point],null,4));
    //     //     pubnub.publish({
    //     //       channel: channel,
    //     //       // message: [new_point],
    //     //       message: [new_point]
    //     //     });
    //     //   })
    //     //     .fail(function(error){
    //     //       /* error */
    //     //       console.log(error.statusText);
    //     //     });
          
          
    //       // fetch(url).then(function(response) {
    //       //   if (!response.ok){
    //       //     throw Error(response.statusText);
    //       //   }
    //       //   return response.json();
    //       // }).then(function(response) {
    //       //   var trip = response.mode[0].route[0].direction[0].trip[0];
    //       //   var vehicle = response.mode[0].route[0].direction[0].trip[0].vehicle;
    //       //   // var vehicle = response.vehicle;
    //       //   // var vehicle = response.mode[0].route[0].direction;
    //       //   // console.log(JSON.stringify(trip,null,4));
              
    //       //   var lat = vehicle.vehicle_lat;
    //       //   var lon = vehicle.vehicle_lon;
    //       //   var new_point = JSON.parse(JSON.stringify(point));
    //       //   new_point.trip_name = trip.trip_name;
    //       //   new_point.latlng = [lat,  lon];
            
    //       //   pubnub.publish({
    //       //     channel: channel,
    //       //     // message: [new_point],
    //       //     message: [new_point]
    //       //   });
            
    //       // }).catch(function(error){
    //       //   console.log(error);
    //       // });
    //     //}, 1000);
    //   }
      
    </script>