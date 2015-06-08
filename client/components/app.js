// The order of this file matters!
  // 1. All React components are created
  // 2. The AppView is rendered
  // 3. The Google Map is rendered 

//////////////////////////
/// React Views        ///
//////////////////////////

// Creates a View for the whole app, with only two things in it: a single WindowView, and the map canvas
var AppView = React.createClass({displayName: "AppView",
  componentDidMount: function() {
    $(document).on('markerClick', this.handleMarkerClick);
  },
  handleMarkerClick: function(e, data) {
    //If the user clicks on a marker, update the state, which gets passed to the window view.
    this.setState({
      selectedMarkerData:data
    });
    this.render();
  },
  getInitialState: function() {
    // Fakey data
    return {
      selectedMarkerData: {
        display: false,
      }
    }
  },
  render: function() {
    // Every React component needs a single DOM element to wrap all its html. In this case it's <div id="wrapper">
      // The WindowView component will be updated with data associated with a clicked marker
    return (
      React.createElement("div", {id: "wrapper"}, 
        React.createElement("h1", {id: "title"}, "Food Hyped"), 
        React.createElement("input", {id: "pac-input", className: "controls", type: "text", placeholder: "Start typing here"}), 

        React.createElement(WindowView, {data: this.state.selectedMarkerData})
      )
    )
  }
});

// Creates a View for the browser window
var WindowView = React.createClass({displayName: "WindowView",
  render: function() {
    if(this.props.data.display === false) {return(React.createElement("div", null));}
    console.log(this.props.data);
    var instagramPictureUrl = this.props.data.instagramPictureUrl || 
      'http://upload.wikimedia.org/wikipedia/commons/0/0c/Cow_female_black_white.jpg';
    console.log(instagramPictureUrl);
    return (
      React.createElement("div", {id: "window"}, 
        React.createElement("div", {id: "windowTitle"}, this.props.data.name), 
        React.createElement("img", {id: "windowPicture", src: instagramPictureUrl}), 
        React.createElement("div", null, "Its at ", this.props.data.address, " "), 
        React.createElement("div", {id: "windowScore"}, this.props.data.score), 
        React.createElement("a", {href: this.props.data.yelpUrl}, React.createElement("button", {className: "linkButton", id: "yelp"})), 
        React.createElement("a", {href: this.props.data.twitterUrl}, React.createElement("button", {className: "linkButton", id: "twitter"})), 
        React.createElement("a", {href: this.props.data.instagramUrl}, React.createElement("button", {className: "linkButton", id: "instagram"})), 
        React.createElement("a", {href: this.props.data.googlePlacesUrl}, React.createElement("button", {className: "linkButton", id: "googlePlaces"}))
      )
    )
  }
});

// var LinkButton = React.createClass({
//   render: function() {
//     if(!this.props.url) {
//       return (<span></span>)
//     } else {
//       return(
//         <a href={this.props.url}><button className="linkButton" id={this.props.id}></button></a>
//       )
//     }
//   }
// });

//<LinkButton url={this.props.data.yelpUrl} id={"yelp"} />


// Renders the whole application
React.render(
  React.createElement(AppView, null),
  document.getElementById('AppView')
);
