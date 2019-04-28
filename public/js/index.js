var currentBuild = 99;
var currentFac = 99;
var GGM;
var service;
var origins = [];
var pos;
var numb;
var map;
var mark;
var stopCounter=true;
    window.lat =13.7367;
    window.lng =100.5331;
var arr_Destination = [
    { title: 'Place A', lat: 13.736363, lng: 100.533980 },
    { title: 'Place B', lat: 13.736086, lng: 100.533973 },
];
var destinations = [];
var posPlace;

//Filters
var librMarkers = [];
var librCounter = 0;
var vendmMarkers = [];
var vendmCounter = 0;
var copyMarkers = [];
var copyCounter = 0;
var coffeeshopMarkers = [];
var coffeeshopCounter = 0;
var museumMarkers = [];
var museumCounter = 0;
var canteenMarkers = [];
var canteenCounter = 0;
var atmMarkers = [];
var atmCounter = 0;
// Merge all variables/defines here
// Current Location (if applicable)
var currentLat = null;
var currentLng = null;

// Modes of Transport Booleans
// Until an interface for them is implemented, edit these boolean parameters below to define allowed modes of transport
//var walkingAllowed = true; // Unnecessary
var bicycleAllowed = false;
var hamoAllowed = false;
var popBusAllowed = true;
var muvmiAllowed = false;

// Create Directions Renderers (only 3 are are needed at most as of now)
var directionsDisplay1;
var directionsDisplay2;
var directionsDisplay3;

setInterval(function(){updatePosition(getLocation());}, 1000);
var initMap=function() {
    //Map options
    console.log("FILE 1 map executed")
    var options = {
        zoom: 17,
        center: { lat: 13.7384, lng: 100.5321 }
    }
    //Create Map
     map = new google.maps.Map(document.getElementById('map'), options);
     mark = new google.maps.Marker({position:{lat:lat, lng:lng}, map:map});
     mark.setVisible(false);
    setInterval(function(){realtimeSetup();},1000);
    var directionsService = new google.maps.DirectionsService;
    // Instantiate Directions Renderers
    directionsDisplay1 = new google.maps.DirectionsRenderer;
    directionsDisplay2 = new google.maps.DirectionsRenderer;
    directionsDisplay3 = new google.maps.DirectionsRenderer;
    directionsDisplay1.setMap(map);
    directionsDisplay2.setMap(map);
    directionsDisplay3.setMap(map);
    directionsDisplay1.setOptions({polylineOptions: new google.maps.Polyline({
        // Blue
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 5
    })}); directionsDisplay3.setOptions({polylineOptions: new google.maps.Polyline({
        // Blue
        strokeColor: '#0000FF',
        strokeOpacity: 1.0,
        strokeWeight: 5
    })});
    var directionsDisplay = new google.maps.DirectionsRenderer;
    GGM = new Object(google.maps);
    service = new GGM.DistanceMatrixService();
    directionsDisplay.setMap(map);
    
    

    document.getElementById("atm").addEventListener("click", function () {
        atmCounter++;
        $.get('/location/atm', (data) => {
            console.log("ATM ", data[0].Latitude);
            if (atmCounter % 2 != 0) {
                for (i = 0; i <= atmMarkers.length; i++) {
                    atmMarkers[i] = new google.maps.Marker({
                        position: new google.maps.LatLng(data[i].Latitude, data[i].Longitude),
                        map: map,
                        icon: '/img/atm.png'
                    });
                }
            } else {
                for (i = 0; i <= atmMarkers.length; i++) {
                    atmMarkers[i].setVisible(false);
                }
            }
        });
    });

    document.getElementById("canteen").addEventListener("click", function () {
        canteenCounter++;
        $.get('/location/canteen', (data) => {
            if (canteenCounter % 2 != 0) {
                for (i = 0; i <= canteenMarkers.length; i++) {
                    canteenMarkers[i] = new google.maps.Marker({
                        position: new google.maps.LatLng(data[i].Latitude, data[i].Longitude),
                        map: map,
                        icon: '/img/canteen.png'
                    });
                }
            } else {
                for (i = 0; i <= canteenMarkers.length; i++) {
                    canteenMarkers[i].setVisible(false);
                }
            }
        });
    });

    document.getElementById("museum").addEventListener("click", function () {
        museumCounter++;
        $.get('/location/museum', (data) => {
            if (museumCounter % 2 != 0) {
                for (i = 0; i <= museumMarkers.length; i++) {
                    museumMarkers[i] = new google.maps.Marker({
                        position: new google.maps.LatLng(data[i].Latitude, data[i].Longitude),
                        map: map,
                        icon: '/img/museum.png'
                    });
                }
            } else {
                for (i = 0; i <= museumMarkers.length; i++) {
                    museumMarkers[i].setVisible(false);
                }
            }
        });
    });

    document.getElementById("coffeeshop").addEventListener("click", function () {
        coffeeshopCounter++;
        $.get('/location/coffeeshop', (data) => {
            if (coffeeshopCounter % 2 != 0) {
                for (i = 0; i <= coffeeshopMarkers.length; i++) {
                    coffeeshopMarkers[i] = new google.maps.Marker({
                        position: new google.maps.LatLng(data[i].Latitude, data[i].Longitude),
                        map: map,
                        icon: '/img/coffee.png'
                    });
                }
            } else {
                for (i = 0; i <= coffeeshopMarkers.length; i++) {
                    coffeeshopMarkers[i].setVisible(false);
                }
            }
        });
    });

    document.getElementById("copyprint").addEventListener("click", function () {
        copyCounter++;
        $.get('/location/copyprint', (data) => {
            if (copyCounter % 2 != 0) {
                for (i = 0; i <= copyMarkers.length; i++) {
                    copyMarkers[i] = new google.maps.Marker({
                        position: new google.maps.LatLng(data[i].Latitude, data[i].Longitude),
                        map: map,
                        icon: '/img/copy.png'
                    });
                }
            } else {
                for (i = 0; i <= copyMarkers.length; i++) {
                    copyMarkers[i].setVisible(false);
                }
            }
        });
    });

    document.getElementById("vendm").addEventListener("click", function () {
        vendmCounter++;
        $.get('/location/vending_machine', (data) => {
            if (vendmCounter % 2 != 0) {
                for (i = 0; i <= vendmMarkers.length; i++) {
                    vendmMarkers[i] = new google.maps.Marker({
                        position: new google.maps.LatLng(data[i].Latitude, data[i].Longitude),
                        map: map,
                        icon: '/img/vending.png'
                    });
                }
            } else {
                for (i = 0; i <= vendmMarkers.length; i++) {
                    vendmMarkers[i].setVisible(false);
                }
            }
        });
    });

    document.getElementById("libr").addEventListener("click", function () {
        librCounter++;
        $.get('/location/library', (data) => {
            if (librCounter % 2 != 0) {
                for (i = 0; i <= librMarkers.length; i++) {
                    librMarkers[i] = new google.maps.Marker({
                        position: new google.maps.LatLng(data[i].Latitude, data[i].Longitude),
                        map: map,
                        icon: '/img/Libr.png'
                    });
                }
            } else {
                for (i = 0; i <= librMarkers.length; i++) {
                    librMarkers[i].setVisible(false);
                }
            }
        });
    });

    document.getElementById('getRoute').onclick = function () {
        getCurrentLocation();
        setTimeout(() => calculateAndDisplayRoute(directionsService, directionsDisplay1, directionsDisplay2, directionsDisplay3, searchBox), 2000);
    };
    // Listen for click on map
    google.maps.event.addListener(map, 'click', function (event) {
    });

    var markers = [];
    /*
    // Array of markers
    var markers = [
        {
            coords: { lat: 13.7367, lng: 100.5331 },
            iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            content: '<h1>Faculty of Engineering</h1>'
        },
        {
            coords: { lat: 13.7393, lng: 100.5341 },
            content: '<h1>Faculty of Art</h1>'
        }
    ];*/

    //search box ja
    var searchBox = new google.maps.places.SearchBox(document.getElementById("building-search-box"));
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', searchPlace);
    function searchPlace() {
        var places = searchBox.getPlaces();
        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                title: place.name,
                position: place.geometry.location,
            }));
            closeCourseInfo();
            //engineering building 1
            if (place.geometry.location == "(13.7365812, 100.53260790000002)" || place.geometry.location == "(13.7365812, 100.53257869999993)") {
                openFloorPlan();
                mapFunc(0, 1);
            }

            //engineering building 2
            else if (place.geometry.location == "(13.7364773, 100.53339249999999)") {
                openFloorPlan();
                mapFunc(0, 2);
            }
            //engineering building 3
            else if (place.geometry.location == "(13.7368903, 100.53315620000001)") {
                openFloorPlan();
                mapFunc(0, 3);
            }

            //engineering building 100
            else if (place.geometry.location == "(13.736365, 100.53394780000008)" || place.geometry.location == "(13.7364442, 100.53388510000002)") {
                openFloorPlan();
                mapFunc(0, 100);
            }

            //Maha Chakri Sirindhorn Building
            else if (place.geometry.location == "(13.7392952, 100.5340708)" || place.geometry.location == "(13.7392241, 100.53434160000006)") {
                openFloorPlan();
                mapFunc(1, 1);
            }
            else {
                closeFloorPlan();
            }

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    };

    document.getElementById("gobuilding").addEventListener("click", function () {
        if (document.getElementById("building-search-box").value.length == 0) {
            alert("Please enter destination.");
        } else {
            searchPlace();
        }
    });
    document.getElementById("building-search-box").onkeydown = function () {
        if (event.key === 'Enter') {
            if (document.getElementById("building-search-box").value.length == 0) {
                alert("Please enter destination.");
            } else {
                searchPlace();
            }
        }

    }
    calculateDistance();

};
window.initMap=initMap;





var listCourse = ["2190101 Computer Programming", "2183101 Engineering Graphics"];
var theCourse = ""

function courseOnEnter(ele) {
    if (event.key === 'Enter') {
        searchCourse()
    }
}

function searchCourse() {

    for (i = 0; i < listCourse.length; i++) {
        if (document.getElementById("course-search").value == (listCourse[i])) {
            theCourse = listCourse[i];
            break;
        }
    }
    if (theCourse != "") {
        showCourse();
    } else if (document.getElementById("course-search").value.length == 0) {
        alert("Please enter course.")
    } else {
        alert("Course Not Found");
        document.getElementById("course-info").style.display = "none";
    }
}

function showCourse() {
    var courseDiv = document.getElementById("course-info");
    courseDiv.style.display = "block";
    document.getElementById("course-info-head").style.display = "block";
    document.getElementById("course-info-head").scrollIntoView({ behavior: "smooth" });
    courseDiv.innerHTML = "<p>Course : " + theCourse + "<br> Section :<br> Lecturer :<br> Day : <br> Time : <br> Room number : <br> Building : <br> Floor : <br> Faculty : </p>";
    theCourse = ""; //prepare to use for next course search
}




function openFloorPlan() {
    document.getElementById("flPlan").style.display = "block";
    document.getElementById("flPlan").scrollIntoView(true, { behavior: "smooth" });
}

function closeCourseInfo() {
    document.getElementById("course-info").style.display = "none";
    document.getElementById("course-info-head").style.display = "none";
}

function closeFloorPlan() {
    document.getElementById("flPlan").style.display = "none";
}

function selBuild() {
    // document.getElementById("fl-4").classList.toggle("hide");
    document.getElementById("myDropdown").classList.toggle("show");
    //document.getElementById("fl-4").classList.toggle("hide");
}

function mapFunc(fac, building) {

    //*
    var flList = document.getElementById("selfloorlist");

    //create floor list options
    var flarr = []
    //floor 1 to 12
    for (a = 1; a < 13; a++) {
        flarr[a] = document.createElement("option");
        flarr[a].text = "Floor " + a;
    }

    //floor M, M1, M2, M3
    for (b = 20; b < 24; b++) {
        flarr[b] = document.createElement("option");
        flarr[b].text = "Floor M" + (b - 20);
        if (b == 20) {
            flarr[b].text = "Floor M";
        }
    }

    //clear floor list value
    while (flList.options.length > 0) {
        flList.remove(0);
    }

    //selected building number and faculty
    currentBuild = building;
    currentFac = fac;

    //old ver floor drop down
    //document.getElementById("theDrop2").innerText = "Floor 1";

    if (fac == 0) { //if it is a building in faculty of engineering
        if (building == 100) {//default floor is M
            flList.add(flarr[20]);
            for (x = 3; x < 8; x++) {
                flList.add(flarr[x]);
            }
            flList.add(flarr[9]);
            flList.add(flarr[10]);
            flList.add(flarr[12]);
            document.getElementById("show-map").innerHTML = "<center><img src=\"img/ENG0100-FR90.png\"></center>"
            document.getElementById("theDrop2").innerText = "Floor M";
        }
        else {
            flList.add(flarr[1]);
            flList.add(flarr[2]);
            flList.add(flarr[3]);

            if (building == 3) {
                flList.add(flarr[4]);
            }

            //default floor is 1
            document.getElementById("show-map").innerHTML = "<center><img src=\"img/ENG0" + building + "-FR1.png\"></center>"
            //document.getElementById("theDrop").innerText = "Engineering Building " + building;
            document.getElementById("building-num").innerText = "Engineering Building " + building;
        }


    }
    else if (fac == 1) { //if it is a building in faculty of arts
        flList.add(flarr[21]);
        flList.add(flarr[23]);
        for (y = 1; y < 10; y++) {
            flList.add(flarr[y]);
        }
        flList.value = "Floor 1";

        document.getElementById("show-map").innerHTML = "<center><img src=\"img/ARTS01-FR1.png\"></center>"
        //document.getElementById("theDrop").innerText = "Maha Chakri Sirindhorn Building";
        document.getElementById("building-num").innerText = "Maha Chakri Sirindhorn Building";
    }
}

//geolocation
function gpsHere() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onRecievePosition, positionNotRecieved);
        //update current location (not tested yet)
        var overwatch = navigator.geolocation.watchPosition(onRecievePosition, positionNotRecieved);
        console.log(overwatch);
        navigator.geolocation.clearWatch(overwatch);
    }
    function onRecievePosition(currentPosition) {
        console.log(currentPosition);
        currentLat = currentPosition.coords.latitude;
        currentLng = currentPosition.coords.longitude;
        //mark current location
        var options = {
            zoom: 17,
            center: { lat: currentLat, lng: currentLng }
        }
        var map = new google.maps.Map(document.getElementById('map'), options);
        var marker = new google.maps.Marker({
            position: { lat: currentLat, lng: currentLng },
            map: map,
            //icon: '/img/canteen.png' 
            //icon: ,
            //draggable:trues
        });
    }

    function positionNotRecieved(positionError) {
        console.log(positionError);
    }
}

//variable to store current location
var currentLat;
var currentLng;

//get the current location and update variable "currentLat" and "currentLng"
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            currentLat = position.coords.latitude;
            currentLng = position.coords.longitude;
        });
    }
}

//Draw route from current location to destination


function flFunc() {
    var flList = document.getElementById("selfloorlist");
    var selectedFloor = flList.value + ""
    var flstr = selectedFloor.slice(6)
    if (flstr == "M") {
        flstr = 90;
    }
    else if (flstr[0] == "M") {
        flstr = parseInt(flstr[1]) + 90;
    }
    if (currentFac == 0) { //if it is a building in faculty of engineering
        document.getElementById("show-map").innerHTML = "<center><img src=\"img/ENG0" + currentBuild + "-FR" + flstr + ".png\"></center>"
    }
    else if (currentFac == 1) { //if it is a building in faculty of arts
        document.getElementById("show-map").innerHTML = "<center><img src=\"img/ARTS01-FR" + flstr + ".png\"></center>"
    }
}
// Determine best travel/transport mode
function calculateBestTravelMode(start, end, popBusNode, bicycleNode, hamoNode, muvmiNode, callback) {
    var leastDistance = 0;
    var bestMode = 'walking';
    var startIndex = 0;
    var endIndex = 1;

    // Walking
    // Debugging
    console.log('Calculating Distance for Walking...');

    calculateDistance(0, 'WALKING',
        start[0].lat(), start[0].lng(),
        end[0].lat(), end[0].lng(),
        function(leastDistance) {
            // Debugging
            console.log('leastDistance = ' + leastDistance);

            calculateBicycleDistance(bicycleAllowed, start, end, bicycleNode, leastDistance,
                function(bicycleStatus, bicycleDistance = 0, bicycleStartIndex = 0, bicycleEndIndex = 0) {
                    if(bicycleStatus) {
                        leastDistance = bicycleDistance;
                        bestMode = 'bicycle';
                        startIndex = bicycleStartIndex;
                        endIndex = bicycleEndIndex;
                    }

                    calculateHamoDistance(hamoAllowed, start, end, hamoNode, leastDistance,
                        function(hamoStatus, hamoDistance = 0, hamoStartIndex = 0, hamoEndIndex = 0) {
                            if(hamoStatus) {
                                leastDistance = hamoDistance;
                                bestMode = 'hamo';
                                startIndex = hamoStartIndex;
                                endIndex = hamoEndIndex;
                            }

                            calculatePopBusDistance(popBusAllowed, start, end, popBusNode, leastDistance,
                                function(popBusStatus, popBusDistance = 0, popBusStartIndex = 0, popBusEndIndex = 0) {
                                    if(popBusStatus) {
                                        leastDistance = popBusDistance;
                                        bestMode = 'popBus';
                                        startIndex = popBusStartIndex;
                                        endIndex = popBusEndIndex;
                                    }

                                    calculateMuvmiDistance(muvmiAllowed, start, end, muvmiNode, leastDistance,
                                        function(muvmiStatus, muvmiDistance = 0, muvmiStartIndex = 0, muvmiEndIndex = 0) {
                                            if(muvmiStatus) {
                                                leastDistance = muvmiDistance;
                                                bestMode = 'muvmi';
                                                startIndex = muvmiStartIndex;
                                                endIndex = muvmiEndIndex;
                                            }
                                              // Debug -- force popBus as bestMode
                                                startIndex = popBusStartIndex;
                                                endIndex = popBusEndIndex;
                                            callback(bestMode, startIndex, endIndex);
                                        }
                                    );
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}

// Calculate Bicycle Distance
function calculateBicycleDistance(allowed, start, end, bicycleNode, leastDistance, callback) {
    if(!allowed) {
        callback(false);
        return;
    }
    
    var distance = 0;
    var startIndex = 0;
    var endIndex = 1;

    calculateDistance(0, 'WALKING',
        start[0].lat(), start[0].lng(),
        bicycleNode[0].lat(), bicycleNode[0].lng(),
        function(tempDistance1) {
            calculateDistance(0, 'WALKING',
                start[0].lat(), start[0].lng(),
                bicycleNode[1].lat(), bicycleNode[1].lng(),
                function(tempDistance2) {
                    if(tempDistance1 <= tempDistance2) {
                        distance = tempDistance1;
                    } else {
                        distance = tempDistance2;
                        startIndex = 1;
                        endIndex = 0;
                    }

                    calculateDistance(0, 'DRIVING',
                        bicycleNode[startIndex].lat(), bicycleNode[startIndex].lng(),
                        bicycleNode[endIndex].lat(), bicycleNode[endIndex].lng(),
                        function(tempDistance3) {
                            distance += tempDistance3;
                            
                            calculateDistance(0, 'WALKING',
                                bicycleNode[endIndex].lat(), bicycleNode[endIndex].lng(),
                                end[0].lat(), end[0].lng(),
                                function(tempDistance4) {
                                    distance += tempDistance4;

                                    if(distance < leastDistance) {
                                        callback(true, distance, startIndex, endIndex);
                                    } else {
                                        callback(false);
                                    }
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}

// Calculate Hamo Distance
function calculateHamoDistance(allowed, start, end, hamoNode, leastDistance, callback) {
    if(!allowed) {
        callback(false);
        return;
    }
    
    var distance = 0;
    var startIndex = 0;
    var endIndex = 1;

    calculateDistance(0, 'WALKING',
        start[0].lat(), start[0].lng(),
        hamoNode[0].lat(), hamoNode[0].lng(),
        function(tempDistance1) {
            calculateDistance(0, 'WALKING',
                start[0].lat(), start[0].lng(),
                hamoNode[1].lat(), hamoNode[1].lng(),
                function(tempDistance2) {
                    if(tempDistance1 <= tempDistance2) {
                        distance = tempDistance1;
                    } else {
                        distance = tempDistance2;
                        startIndex = 1;
                        endIndex = 0;
                    }

                    calculateDistance(0, 'DRIVING',
                        hamoNode[startIndex].lat(), hamoNode[startIndex].lng(),
                        hamoNode[endIndex].lat(), hamoNode[endIndex].lng(),
                        function(tempDistance3) {
                            distance += tempDistance3;
                            
                            calculateDistance(0, 'WALKING',
                                hamoNode[endIndex].lat(), hamoNode[endIndex].lng(),
                                end[0].lat(), end[0].lng(),
                                function(tempDistance4) {
                                    distance += tempDistance4;

                                    if(distance < leastDistance) {
                                        callback(true, distance, startIndex, endIndex);
                                    } else {
                                        callback(false);
                                    }
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}

// Calculate Pop Bus Distance
function calculatePopBusDistance(allowed, start, end, popBusNode, leastDistance, callback) {
    if(!allowed) {
        callback(false);
        return;
    }
    
    var distance = 0;
    var startIndex = 0;
    var endIndex = 1;

    calculateDistance(0, 'WALKING',
        start[0].lat(), start[0].lng(),
        popBusNode[0].lat(), popBusNode[0].lng(),
        function(tempDistance1) {
            calculateDistance(0, 'WALKING',
                start[0].lat(), start[0].lng(),
                popBusNode[1].lat(), popBusNode[1].lng(),
                function(tempDistance2) {
                    if(tempDistance1 <= tempDistance2) {
                        distance = tempDistance1;
                    } else {
                        distance = tempDistance2;
                        startIndex = 1;
                        endIndex = 0;
                    }

                    calculateDistance(0, 'DRIVING',
                        popBusNode[startIndex].lat(), popBusNode[startIndex].lng(),
                        popBusNode[endIndex].lat(), popBusNode[endIndex].lng(),
                        function(tempDistance3) {
                            distance += tempDistance3;
                            
                            calculateDistance(0, 'WALKING',
                                popBusNode[endIndex].lat(), popBusNode[endIndex].lng(),
                                end[0].lat(), end[0].lng(),
                                function(tempDistance4) {
                                    distance += tempDistance4;

                                    if(distance < leastDistance) {
                                        callback(true, distance, startIndex, endIndex);
                                    } else {
                                        callback(false);
                                    }
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}

// Calculate Muvmi Distance
function calculateMuvmiDistance(allowed, start, end, muvmiNode, leastDistance, callback) {
    if(!allowed) {
        callback(false);
        return;
    }
    
    var distance = 0;
    var startIndex = 0;
    var endIndex = 1;

    calculateDistance(0, 'WALKING',
        start[0].lat(), start[0].lng(),
        muvmiNode[0].lat(), muvmiNode[0].lng(),
        function(tempDistance1) {
            calculateDistance(0, 'WALKING',
                start[0].lat(), start[0].lng(),
                muvmiNode[1].lat(), muvmiNode[1].lng(),
                function(tempDistance2) {
                    if(tempDistance1 <= tempDistance2) {
                        distance = tempDistance1;
                    } else {
                        distance = tempDistance2;
                        startIndex = 1;
                        endIndex = 0;
                    }

                    calculateDistance(0, 'DRIVING',
                        muvmiNode[startIndex].lat(), muvmiNode[startIndex].lng(),
                        muvmiNode[endIndex].lat(), muvmiNode[endIndex].lng(),
                        function(tempDistance3) {
                            distance += tempDistance3;
                            
                            calculateDistance(0, 'WALKING',
                                muvmiNode[endIndex].lat(), muvmiNode[endIndex].lng(),
                                end[0].lat(), end[0].lng(),
                                function(tempDistance4) {
                                    distance += tempDistance4;

                                    if(distance < leastDistance) {
                                        callback(true, distance, startIndex, endIndex);
                                    } else {
                                        callback(false);
                                    }
                                }
                            );
                        }
                    );
                }
            );
        }
    );
}

//Draw route from current location to destination
function calculateAndDisplayRoute(directionsService, directionsDisplay1, directionsDisplay2, directionsDisplay3, searchBox) {
    // Pre-Setup
    var places = searchBox.getPlaces();
    if (!places) {
        alert("A destination location must be selected before route inquiries can be made.");
        return;
    }

    // Setup
    var destination = places[0];
    var destinationLat = destination.geometry.location.lat();
    var destinationLng = destination.geometry.location.lng();
    
    var start = [];
    var end = [];
    start.push(new GGM.LatLng(currentLat, currentLng));
    end.push(new GGM.LatLng(destinationLat, destinationLng));
    
    // Initialize regardless of allowed modes of transport
    var popBusNode = [
        new google.maps.LatLng(13.7400, 100.5315),
        new google.maps.LatLng(13.7374, 100.5311),
    ];
    // TODO - follow the format above
    // Must complete before method is used
    var bicycleNode = null;
    var hamoNode = null;
    var muvmiNode = null;

    // Debug (for Walking)
    //var startEntries = Object.entries(start[0]);
    //for(let startValue of Object.values(startEntries)) {
    //    console.log(startValue[0] + ' = ' + startValue[1]());
    //}
    //
    //var destinationEntries = Object.entries(destination);
    //for(let destinationValue of destinationEntries) {
    //    console.log(destinationValue[0] + ' = ' + destinationValue[1]);
    //}

    calculateBestTravelMode(start, end, popBusNode, bicycleNode, hamoNode, muvmiNode,
        function(bestMode, startIndex, endIndex) {
            // Suppress/Clear Directions
            directionsDisplay1.set('directions', null);
            directionsDisplay2.set('directions', null);
            directionsDisplay3.set('directions', null);

            // Debug -- Force Pop Bus as Best Mode to test functionality
            bestMode = 'popBus';

            switch(bestMode) {
                case 'walking':
                    directionsService.route({
                        origin: start[0],
                        destination: end[0],
                        travelMode: 'WALKING',
                    }, function (response, status) {
                        if (status === 'OK') {
                            directionsDisplay1.setDirections(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    });
                    break;
                
                default:
                    var startStationNode;
                    var endStationNode;
                    switch(bestMode) {
                        case 'bicycle':
                            startStationNode = bicycleNode[startIndex];
                            endStationNode = bicycleNode[endIndex];
                            directionsDisplay2.setOptions({polylineOptions: new google.maps.Polyline({
                                // Red
                                strokeColor: '#FF0000',
                                strokeOpacity: 1.0,
                                strokeWeight: 5
                            })});
                            break;
                        case 'hamo':
                            startStationNode = hamoNode[startIndex];
                            endStationNode = hamoNode[endIndex];
                            directionsDisplay2.setOptions({polylineOptions: new google.maps.Polyline({
                                // Purple
                                strokeColor: '#800080',
                                strokeOpacity: 1.0,
                                strokeWeight: 5
                            })});
                            break;
                        case 'popBus':
                            startStationNode = popBusNode[startIndex];
                            endStationNode = popBusNode[endIndex];
                            directionsDisplay2.setOptions({polylineOptions: new google.maps.Polyline({
                                // Green
                                strokeColor: '#008000',
                                strokeOpacity: 1.0,
                                strokeWeight: 5
                            })});
                            break;
                        case 'muvmi':
                            startStationNode = muvmiNode[startIndex];
                            endStationNode = muvmiNode[endIndex];
                            directionsDisplay2.setOptions({polylineOptions: new google.maps.Polyline({
                                // Orange
                                strokeColor: '#FFA500',
                                strokeOpacity: 1.0,
                                strokeWeight: 5
                            })});
                            break;
                        default:
                            window.alert("Error on inner switch(bestMode)");
                            break;
                    } directionsService.route({
                        origin: start[0],
                        destination: startStationNode,
                        travelMode: 'WALKING',
                    }, function (response, status) {
                        if (status === 'OK') {
                            directionsDisplay1.setDirections(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    }); directionsService.route({
                        origin: startStationNode,
                        destination: endStationNode,
                        travelMode: 'DRIVING',
                    }, function (response, status) {
                        if (status === 'OK') {
                            directionsDisplay2.setDirections(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    }); directionsService.route({
                        origin: endStationNode,
                        destination: end[0],
                        travelMode: 'WALKING',
                    }, function (response, status) {
                        if (status === 'OK') {
                            directionsDisplay3.setDirections(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    });
                    break;
            }
        }
    );
}

function calculateDistance(mode = 1, transportMode = 'DRIVING', fromLat = 0, fromLng = 0, toLat = 0, toLng = 0, callback) {
    // Mode: 0 = Default, 1 = Startup

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Return Value
            var returnVar;

            var origins = [];
            var destinations = [];
            switch(mode) {
                case 0:
                    // Debug
                    console.log('Processing calculateDistance mode 0 (non-default)...');
                    console.log('transportMode = ' + transportMode); 
                    console.log('fromLat = ' + fromLat);
                    console.log('fromLng = ' + fromLng);
                    console.log('toLat = ' + toLat);
                    console.log('toLng = ' + toLng);

                    origins.push(new GGM.LatLng(fromLat, fromLng));
                    destinations.push(new GGM.LatLng(toLat, toLng));
                    break;
                
                case 1:
                    origins.push(new GGM.LatLng(position.coords.latitude, position.coords.longitude));

                    for (i = 0; i < arr_Destination.length; i++) {
                        var htmlTr = '<tr><td>' + arr_Destination[i].title + '</td><td class="place_distance"></td></tr>';
                        $("#placeData").append(htmlTr);  
                        posPlace = new GGM.LatLng(arr_Destination[i].lat, arr_Destination[i].lng);
                        destinations.push(posPlace);
                    } break;

                default:
                    window.alert("Error on calculateDistance");
                    return;
                    break;
            }
           
            service.getDistanceMatrix({
                origins: origins,
                destinations: destinations,
                travelMode: transportMode,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: true,
                avoidTolls: true,
            }, calculateDistanceCallBack);
            function calculateDistanceCallBack(response, status) {
                if (status == 'OK') {
                    console.log(response.rows);
                    $.each(response.rows[0].elements, function (i, elm) {
                        console.log(i);
                        console.log(elm);
                        if(mode == 1) {
                            $(".place_distance:eq(" + i + ")").text(elm.distance.text);
                            var txt = elm.distance.text;
                            numb = txt.match(/\d/g);
                            numb = numb.join("");
                            console.log(numb);
                        } else if(mode == 0) {
                            returnVar = elm.distance.value;
                            
                            // Debug
                            console.log('returnVar = ' + returnVar);
                            console.log('returnVar returned');
                            callback(returnVar);
                        }
                    });
                }
            }
        }, function () {
            // คำสั่งทำงาน ถ้า ระบบระบุตำแหน่ง geolocation ผิดพลาด หรือไม่ทำงาน    
        });
    } else {

    }
}