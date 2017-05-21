/* global $ */
import { drawMap } from './map-module';

$(function() {
    // executes when all html elements are ready
    // console.log("on load");

    // build the dropdown list for routes
    // console.log(JSON.stringify(mbta_routes,null,4));

    var routes = transit_routes.map(function(obj) {
        return {
            id: parseInt(obj.route_id),
            lname: obj.route_long_name,
            sname: obj.route_short_name
        }
    });
    
    var sorted_routes = _.sortBy(routes, ['id']);

    var routes_html = ""; // initializing a variable

    sorted_routes.forEach(function(obj) {
        // console.log(JSON.stringify(obj,null,4));
        var name;
        if (obj.lname) {
            name = obj.lname;
        }
        else {
            name = obj.sname;
        }


        routes_html += `
            <li>
                <input type="hidden" name="id" value="${obj.id}">
                <a href="#">${obj.id} ${name}</a>
            </li>
        `;
        // console.log(routes_html);
    });

    
    function get_stops(route_id, direction_id){
        // Call api to get the stops
        var get_stops_url = `https://viaapi.gear.host/Buses/GetStopIdByRouteAndDirection?routeId=${route_id}&directionId=${direction_id}`;
        var stops_html = "";
        
        $.get(get_stops_url, function(response) {
            /* success */
            var stops = JSON.parse(response);
            // console.log(stops);
            stops.forEach(function(obj) {
                stops_html += `
                    <li>
                        <input type="hidden" name="id" value="${obj.stop_id}">
                        <a href="#">${obj.stop_name}</a>
                    </li>
                `;
            });
            $("#stops_list").html(stops_html);
            $("#stops-dropdown").removeClass("disabled");
            $('#stops_list li > a').click(function(e) {
                // console.log("inside");
                // alert("test");
                $('#stops-dropdown').html(this.innerHTML + ` <span class="caret"></span>`);
            });
        })
        .fail(function(error) {
            /* error */
            console.log(error.statusText);
        });
        
        
        // console.log(JSON.stringify(stops_html,null,4));
    }

    $("#transit_list").html(routes_html);
        //console.log(JSON.stringify(routes,null,4));

    var route_id = 0, 
        direction_id = null,
        route_shape = {path: [], id: 0};
    $('#transit_list li > a').click(function(e) {
        $('.routes').html(this.innerHTML + ` <span class="caret"></span>`);
        $("#direction-dropdown").removeClass("disabled");
        route_id = parseInt($(this).prev().val());
     
        if(direction_id === 0 || direction_id === 1){
            console.log("direction_id", direction_id);
            $('#stops-dropdown').html(`Select Stop <span class="caret"></span>`);
            get_stops(route_id, direction_id);
        }
        // console.log(map);
        route_shape = (route_shape.path == route17_paths) ? {path: route2_paths, id: 2} : {path: route17_paths, id: 17};
        // console.log("route_shape", route_shape);
        drawMap(route_shape.path, route_shape.id);
    });
    
    
    $('#direction_list li > a').click(function(e) {
        $('#direction-dropdown').html(this.innerHTML + ` <span class="caret"></span>`);
        direction_id = parseInt($(this).prev().val());
        console.log("direction_id", direction_id);
        get_stops(route_id, direction_id);
    });
    
    // import map js
    drawMap(route2_paths, 2);
});


