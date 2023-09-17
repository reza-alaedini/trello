function ProfileForm({
  name,
  lastName,
  password,
  setName,
  setLastName,
  setPassword,
  submitHandler,
  useFor,
  info,
  setInfo,
}) {
  return (
    <>
      <div className="profile-form__input">
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={
              useFor === "add"
                ? (e) => setName(e.target.value)
                : (e) => setInfo({ ...info, name: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="last-name">Last Name:</label>
          <input
            id="last-name"
            type="text"
            value={lastName}
            onChange={
              useFor === "add"
                ? (e) => setLastName(e.target.value)
                : (e) => setInfo({ ...info, lastName: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button onClick={submitHandler}>Submit</button>
    </>
  );
}

export default ProfileForm;
