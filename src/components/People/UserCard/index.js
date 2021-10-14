import React from "react";
import { useStyles } from "./styles";
import { Typography, Avatar, Box, TextField } from "@material-ui/core";
import ListItem from "../../ListItem";

const UserCard = ({
  user,
  handleDeleteUser,
  handleChangeUserInfo,
  handleUpload,
}) => {
  const [formState, setFormstate] = React.useState(user);
  const [isEditing, setIsEditing] = React.useState(false);
  const [img, setImg] = React.useState(user.img);
  const classes = useStyles();
  const { name, role, url } = formState;

  React.useEffect(() => {
    setImg(user.img);
    setFormstate({ ...formState, img: user.img });
  }, [user.img]);

  const handleChange = React.useCallback(
    ({ target: { name, value } }) => {
      setFormstate({ ...formState, [name]: value, img });
    },
    [formState, img]
  );

  const handleEdit = () => {
    if (isEditing) {
      handleChangeUserInfo(formState);
    }
    setIsEditing(!isEditing);
  };

  return (
    <ListItem
      id={user.id}
      handleEdit={handleEdit}
      handleDelete={handleDeleteUser}
      handleUpload={handleUpload}
    >
      <Box display="flex">
        <Avatar src={`https://api.cowork.dev/data/img/${img}`} />
        <Box ml="10px" display="flex" flexDirection="column">
          {isEditing ? (
            <Box display="flex" alignItems="center">
              <TextField
                variant="outlined"
                size="small"
                name="name"
                onChange={handleChange}
                value={name}
                placeholder="Name"
              />
              <TextField
                variant="outlined"
                size="small"
                name="role"
                onChange={handleChange}
                value={role}
                placeholder="SurName"
              />
              <TextField
                variant="outlined"
                size="small"
                name="url"
                onChange={handleChange}
                value={url}
                placeholder="Rate"
              />
            </Box>
          ) : (
            <>
              <div style={{ display: "flex", flexFlow: "row" }}>
                <Typography className={classes.subtitle}>
                  {user.name}
                </Typography>
                <Typography className={classes.subtitle}>
                  {user.role}
                </Typography>
              </div>
              <Typography className={classes.subtitle}>
                {user.url && `${user.url} /h`}
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </ListItem>
  );
};

export default UserCard;
