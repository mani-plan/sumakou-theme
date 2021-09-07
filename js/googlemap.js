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
    const categories = mkr.dataset.categories;
    if ( categories.includes('sold') ) {
      return;
    }
    initMarker(mkr, map, categories);
  });

  // Center map based on markers.
  centerMap( map );

  // Return map instance.
  return map;
}
  
/**
 * initMarker
 */
function initMarker( mkr, map, categories ) {

  // Get position from marker.
  const lat = mkr.dataset.lat;
  const lng = mkr.dataset.lng;
  const latLng = {
    lat: parseFloat( lat ),
    lng: parseFloat( lng )
  };
 
  /**
   * Google Maps Platform
   * Customizing a Google Map: Custom Markers
   */
  const icon = mkr.dataset.images + getMarkerIcon(categories);

  // Create marker instance.
  var marker = new google.maps.Marker({
    position : latLng,
    icon: icon,
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

/*
 * getMarkerIcon
 */
function getMarkerIcon( categories ) {
  if (categories.includes('house')) {
    if (categories.includes('solar')) {
      return "ico_map_house_solar.png";
    } else {
      return "ico_map_house.png";
    }
  }
  if (categories.includes('apartment')) {
    if (categories.includes('solar')) {
      return "ico_map_apartment_solar.png";
    } else {
      return "ico_map_apartment.png";
    }
  }
  if (categories.includes('solar')) {
    return "ico_map_solar.png";
  }
  return "ico_map_house.png";
}

document.addEventListener("DOMContentLoaded", function(event) {

  var acfMaps = document.querySelectorAll('.acf-map');
  acfMaps.forEach(function(acfMap, index) {
    var map = initMap(acfMap);
  });

});