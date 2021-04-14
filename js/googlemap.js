/**
 * initMap
 *
 * @param   acfMap element.
 * @return  object The map instance.
 */
function initMap(acfMap) {

  // Find marker elements within map.
  var markers = acfMap.querySelectorAll('.marker');

  // Create gerenic map.
  var mapArgs = {
    zoom        : acfMap.dataset.zoom || 16,
    mapTypeId   : google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map( acfMap, mapArgs );

  // Add markers.
  map.markers = [];
  markers.forEach(function(mkr, index) {
    if ( ['sold', 'solar'].includes(mkr.dataset.icon) ) {
      return;
    }
    initMarker(mkr, map);
  });

  // Center map based on markers.
  centerMap( map );

  // Return map instance.
  return map;
}
  
/**
 * initMarker
 *
 * @param   object element.
 * @param   object The map instance.
 * @return  object The marker instance.
 */
function initMarker( mkr, map ) {

  // Get position from marker.
  var lat = mkr.dataset.lat;
  var lng = mkr.dataset.lng;
  var latLng = {
    lat: parseFloat( lat ),
    lng: parseFloat( lng )
  };
  var icon = mkr.dataset.icon;

  /**
   * Google Maps Platform
   * Customizing a Google Map: Custom Markers
   */
  const images = mkr.dataset.images;
  const icons = {
    house: {
      icon: images + "ico_map_house.png",
    },
    apartment: {
      icon: images + "ico_map_apartment.png",
    },
  };
  // Create marker instance.
  var marker = new google.maps.Marker({
    position : latLng,
    icon: icons[icon].icon,
    map: map
  });

  // Append to reference for later use.
  map.markers.push( marker );

  // If marker contains HTML, add it to an infoWindow.
  if ( mkr.innerHTML ) {
    // Create info window.
    var infowindow = new google.maps.InfoWindow({
      content: mkr.innerHTML
    });

    // Show info window when marker is clicked.
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open( map, marker );
    });
  }
}
  
/**
 * centerMap
 *
 * @param   object The map instance.
 * @return  void
 */
function centerMap( map ) {

  // Create map boundaries from all map markers.
  var bounds = new google.maps.LatLngBounds();
  map.markers.forEach(function( marker ){
    bounds.extend({
      lat: marker.position.lat(),
      lng: marker.position.lng()
    });
  });

  // Case: Single marker.
  if( map.markers.length == 1 ){
    map.setCenter( bounds.getCenter() );

  // Case: Multiple markers.
  } else{
    map.fitBounds( bounds );
  }
}
  
document.addEventListener("DOMContentLoaded", function(event) {

  var acfMaps = document.querySelectorAll('.acf-map');
  acfMaps.forEach(function(acfMap, index) {
    var map = initMap(acfMap);
  });

});