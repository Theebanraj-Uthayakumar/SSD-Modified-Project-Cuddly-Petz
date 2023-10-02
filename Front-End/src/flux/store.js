import { EventEmitter } from "events";

import Dispatcher from "./dispatcher";
import Constants from "./constants";
import Admin from "../data/sidebar-nav-items-admin";
import Hospital from "../data/sidebar-nav-items-hospital";
import PetShop from "../data/sidebar-nav-items-petshop";
import PetOwner from "../data/sidebar-nav-items-petowner";

const Usertype = localStorage.getItem("UserType");
let _store = {
  menuVisible: false,
  navItems:  Usertype === "PetHospital" ? Hospital() : Usertype === "Admin" ? Admin() : Usertype === "PetOwner" ?  PetOwner() : Usertype === "PetShop" ? PetShop() : PetShop() 
};
class Store extends EventEmitter {
  constructor() {
    super();

    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    Dispatcher.register(this.registerToActions.bind(this));
  }

  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      default:
    }
  }

  toggleSidebar() {
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems() {
    return _store.navItems;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }
}

export default new Store();
