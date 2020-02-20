const Home = () => {
  return (
    <div>
      <header>
        <h2>On It</h2>
      </header>
      <main style="margin:auto; max-width: 70%">
        <h2>Login</h2>
        <form style="display:flex;flex-direction:column;">
          <input name="email" type="email" />
          <input type="text" name="password" />
          <button
            type="submit"
            onClick={e => {
              e.preventDefault();
              console.log("CLICK");
            }}
          >
            Login
          </button>
        </form>
      </main>
    </div>
  );
};

export default Home;
