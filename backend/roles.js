import AccessControl from 'accesscontrol';

const ac = AccessControl();

const roles = () => {
  ac.grant("0")
    .readOwn("User")
    .readOwn("File")
    .deleteOwn("File");
  ac.grant("1")
    .extend("0")
    .readAny("User")
    .deleteAny("User")
    .updateAny("User")
    .readAny("File")
    .deleteAny("File")
}

export default roles;