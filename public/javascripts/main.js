function startMap() {
    const kottiBRLN = {
        lat: 52.497992,
        lng: 13.420135
    };
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: kottiBRLN

        //MARKERS
    });
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
            lat: 45.3977381,
            lng: 22.190471916
        },
        map: map,
        title: "I'm not here"
    });
}

startMap();
