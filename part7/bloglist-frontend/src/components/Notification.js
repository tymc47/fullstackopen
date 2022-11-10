import { Alert } from '@mui/material';

const Notification = ({ msgObj }) => {
  if (msgObj === null) {
    return <></>;
  }

  // const msgStyle = {
  //   color: msgObj.type === 'success' ? 'green' : 'red',
  //   background: 'lightgrey',
  //   fontSize: 20,
  //   borderStyle: 'solid',
  //   borderRadius: 5,
  //   padding: 10,
  //   marginBottom: 10,
  // };

  return (
    <Alert className="notification" severity={msgObj.type}>
      {msgObj.content}
    </Alert>
  );
};

export default Notification;
