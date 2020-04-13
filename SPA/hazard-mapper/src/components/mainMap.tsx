import React from "react";
// @ts-ignore
import { connect } from 'react-redux';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
//todo replace with common container component instead of css
import "./mainMap.css";
import {Checkbox, Label} from "react-bootstrap";
import {changeLat, ChangeLat, ChangeLng, changeLng, ChangeZoom, changeZoom} from "../actions/mapActions";

interface IMapDispatchToProps {
    changeLat : (lat : number)  => ChangeLat;
    changeZoom : (zoom : number)  => ChangeZoom;
    changeLng : (lng : number)  => ChangeLng;
}

interface IMapStateToProps {
    lat : number;
    lng : number;
    zoom : number;
}

interface InnerState {
    searchCheckbox : boolean;
    address : string;
}

class MainMap extends React.Component<IMapDispatchToProps & IMapStateToProps, InnerState>  {

    constructor(props : any) {
        super(props);
        this.state = {
            searchCheckbox : true,
            address: ''
        }
    }

    handleInputChange(e : any) {
        // @ts-ignore
        this.setState({[e.target.name ]: e.target.value});
    }

    render() {
        let  position : any = [this.props.lat, this.props.lng];
        return <div className="main-container container">
            <div className={'main-container-toolbar'}>
                    <div className="map-main-toolbar row-cols-1">
                        <label htmlFor={'search-checkbox'} >Lat/Lng</label>
                        <Checkbox name="searchCheckBox" id={'search-checkbox'} onChange={() => this.setState({
                            searchCheckbox : !this.state.searchCheckbox
                        })} checked={this.state.searchCheckbox}></Checkbox>
                        {this.state.searchCheckbox ? (<>
                            <label htmlFor="lat">Lat</label>
                            <div className="input-group mb-3">
                            <input type="number" className="form-control" id="lat" name="lat" aria-describedby="basic-addon3" value={this.props.lat} onChange={e => this.props.changeLat(Number(e.target.value))}/>
                            </div>
                            <label htmlFor="lng">Lng</label>
                            <div className="input-group mb-3">
                            <input type="number" className="form-control" id="lng" name="lng" aria-describedby="basic-addon3" value={this.props.lng} onChange={e => this.props.changeLng(Number(e.target.value))}/>
                            </div>
                            </>
                        )
                            : (
                    <>
                        <label htmlFor="address">Address</label>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" id="address" name="address" aria-describedby="basic-addon3" value={this.state.address} onChange={e => this.handleInputChange(e)}/>
                        </div>
                    </>
                            )
                        }

                <button className="btn btn-secondary" onClick={(e ) =>{
                    e.preventDefault();
                    console.log("process")
                }}>Process</button>
                    </div>
                    </div>
                    <Map center={position} zoom={this.props.zoom} className="map-main-container">
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                        />
                        <Marker position={position}>
                            <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
                        </Marker>
                    </Map>
                </div>
    }
}

const mapDispatchToProps = {
    changeLat,
    changeZoom,
    changeLng
}

const mapStateToProps = (state : any) => ({
    lat: state.lat,
    lng: state.lng,
    zoom: state.zoom
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MainMap)