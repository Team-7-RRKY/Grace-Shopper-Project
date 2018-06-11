import React from 'react';
import { connect } from 'react-redux';
import { filteredWatches } from '../../store/watch.js';
//import Select from '@material-ui/core/Select';
//import MenuItem from '@material-ui/core/MenuItem';
//import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
//import Drawer from '@material-ui/core/Drawer';

class FilterWatches extends React.Component {
  state = {
    brand: '',
    /* tier: '', */
    style: '',
    gender: '',
    price: []
  };

  handleChange = event => {
    this.setState(
      {
        [event.target.name]: event.target.value
      },
      () => {
        console.log('state here', this.state);
      }
    );
  };

  handlePricechange = event => {
    this.setState(
      {
        price: event.target.value.split(',')
      },
      () => {
        console.log('price here', this.state.price);
      }
    );
  };

  handlefilter = event => {
    event.preventDefault();
    const { brand, gender, style, price } = this.state;

    const filtered = this.props.allWatches.filter(watch => {
      return (
        (brand ? watch.brand === brand : true) &&
        (gender ? watch.gender === gender : true) &&
        (price ? price.includes(watch.price) : true) &&
        (style ? watch.style === style : true)
      );
    });
    this.props.filteredWatches(filtered);
  };

  handleReset = () => {
    const filtered = this.props.allWatches;
    this.props.filteredWatches(filtered);
    this.setState({
      brand: '',
      style: '',
      gender: '',
      price: []
    });
  };

  /* price.includes(watch.price) */
  getUniq(arr, val) {
    const res = [];
    for (var i = 0; i < arr.length; i++) {
      if (res.indexOf(arr[i][val]) === -1) {
        res.push(arr[i][val]);
      }
    }
    return res;
  }

  render() {
    const watches = this.props.filtered;
    const allWatches = this.props.allWatches;
    if (watches[0] === undefined) {
      return <CircularProgress />;
    }
    return (
      <form
        onSubmit={this.handlefilter}
        onReset={this.handleReset}
        className="form_class"
      >
        {/* Gender */}
        <span>
          <h3>Please Select Gender and Price Range</h3>
        </span>
        <label>Gender</label>
        <select
          name="gender"
          onChange={this.handleChange}
          value={this.state.gender}
        >
          <option>''</option>
          {this.getUniq(allWatches, 'gender').map(gender => {
            return (
              <option value={gender} key={gender}>
                {gender}
              </option>
            );
          })}
        </select>

        {/* price */}
        <label>Price Range</label>
        <select
          name="price"
          onChange={this.handlePricechange}
          /* value={this.state.price} */
        >
          <option>''</option>

          <option
            value={this.getUniq(allWatches, 'price').filter(pp => {
              return pp.slice(1) < 100;
            })}
          >
            less than $100
          </option>

          <option
            value={this.getUniq(allWatches, 'price').filter(pp => {
              return pp.slice(1) > 100 && pp.slice(1) < 150;
            })}
          >
            $100-$150
          </option>

          <option
            value={this.getUniq(allWatches, 'price').filter(pp => {
              return pp.slice(1) > 150;
            })}
          >
            more than $150
          </option>
        </select>

        {/* Brand */}
        <label>Brand</label>
        <select
          name="brand"
          onChange={this.handleChange}
          value={this.state.brand}
        >
          <option>''</option>
          {this.getUniq(allWatches, 'brand').map(brand => {
            return (
              <option value={brand} key={brand}>
                {brand}
              </option>
            );
          })}
        </select>

        {/* style */}
        <label>Style</label>
        <select
          name="style"
          onChange={this.handleChange}
          value={this.state.style}
        >
          <option>''</option>
          {this.getUniq(allWatches, 'style').map(style => {
            return (
              <option value={style} key={style}>
                {style}
              </option>
            );
          })}
        </select>

        {/* tier
        <label>tier</label>
        <select name="tier" onChange={this.handleChange}>
          <option>Tier</option>
          {this.getUniq(allWatches, 'tier').map(tier => {
            return (
              <option value={tier} key={tier}>
                {tier}
              </option>
            );
          })}
        </select>
 */}

        <Button
          type="submit"
          disabled={
            this.state.price.length < 1 ||
            (this.state.price[0] === '' && this.state.gender === '')
          }
        >
          Filter
        </Button>
        <Button type="reset">reset</Button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  allWatches: state.watch.allWatches,
  filtered: state.watch.filteredWatches
});

const mapDispatchToProps = dispatch => ({
  filteredWatches: watches => {
    dispatch(filteredWatches(watches));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterWatches);
