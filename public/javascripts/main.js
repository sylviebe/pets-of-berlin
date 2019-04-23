function startMap() {
    const kottiBRLN = {
        lat: 52.497992,
        lng: 13.420135
    };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: kottiBRLN
    });
    //INFORMATION BOX
    // const contentString = <div id="content" />;
    //  var infowindow = new google.maps.InfoWindow({
    //content: contentString
}

//MARKERS

const myMarker = new google.maps.Marker({
    position: {
        lat: 52.497992,
        lng: 13.420135 //--->AJAX call
    },
    map: map,
    title: "I'm here",
    icon: './images/guinea-icon.jpg'
});
const myMarker2 = new google.maps.Marker({
    position: {
        lat: 45.3977381, //req.body.longitude --> array: dann wird die Position zu index 0 und 1as  qQ  Q
        lng: 22.190471916 //req.body.latitude
    },
    map: map,
    title: "I'm not here"
});

startMap();
