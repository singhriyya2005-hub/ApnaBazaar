function Register() {
  return (
    <div className="hero">
      <h1>Create Account</h1>

      <br />

      <input
        type="text"
        placeholder="Full Name"
      />

      <br />
      <br />

      <input
        type="email"
        placeholder="Email"
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
      />

      <br />
      <br />

      <button>Register</button>
    </div>
  );
}

export default Register;