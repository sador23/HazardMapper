import React from "react";
// @ts-ignore
import { connect } from 'react-redux';
import { Map, Marker, Popup, TileLayer , LatLng} from 'react-leaflet'
//todo replace with common container component instead of css
import "./mainMap.css";
import {Checkbox, Label} from "react-bootstrap";
import {
    changeLat,
    ChangeLat,
    ChangeLng,
    changeLng,
    ChangeZoom,
    changeZoom, FetchElevation,
    fetchElevation
} from "../actions/mapActions";

interface IMapDispatchToProps {
    changeLat : (lat : number)  => ChangeLat;
    changeZoom : (zoom : number)  => ChangeZoom;
    changeLng : (lng : number)  => ChangeLng;
    fetchElevation : (data : LatLng[]) => FetchElevation;
}

interface IMapStateToProps {
    lat : number;
    lng : number;
    zoom : number;
}

interface InnerState {
    searchCheckbox : boolean;
    address : string;
    southEnd: any;
    northEnd: any;
}

class MainMap extends React.Component<IMapDispatchToProps & IMapStateToProps, InnerState>  {

    componentDidUpdate(prevProps: Readonly<IMapDispatchToProps & IMapStateToProps>, prevState: Readonly<InnerState>, snapshot?: any): void {
        // @ts-ignore
        let y  = this.refs.map.leafletElement.getBounds();

        let north = y.getNorthEast();
        let south = y.getSouthEast();
        if(this.state.southEnd.lat != south.lat && this.state.southEnd.lng != south.lng && this.state.northEnd.lat != north.lat && this.state.northEnd.lng != north.lng){
            this.setState({
                southEnd : y.getSouthWest(),
                northEnd : y.getNorthEast()
            })
        }
    }

    constructor(props : any) {
        super(props);
        this.state = {
            searchCheckbox : true,
            address: '',
            southEnd: 0,
            northEnd : 0
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
                    this.props.fetchElevation([this.state.northEnd,this.state.southEnd]);
                }}>Process</button>
                    </div>
                    </div>
                    <Map center={position} zoom={this.props.zoom} className="map-main-container" ref={"map"}>
                        <TileLayer
                            url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                            attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
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
    changeLng,
    fetchElevation
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