const Message = ({ msgObj }) => {
  if (msgObj === null) {
    return <></>;
  }

  const msgStyle = {
    color: msgObj.type === 'success' ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return <div className="notification" style={msgStyle}>{msgObj.content}</div>;
};

export default Message;