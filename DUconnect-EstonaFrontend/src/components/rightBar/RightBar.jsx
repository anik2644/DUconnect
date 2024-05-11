import "./rightBar.scss";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.ibb.co/ggyKMj3/279725233-1949964898521765-5705253541412336116-n.jpg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Anik</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <img
                src="https://i.ibb.co/8YkTy5X/399802121-2096661420678789-8201301384481582908-n.jpg?auto=compress&cs=tinysrgb&w=1600"
                alt=""
              />
              <span>Eesor Estona</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>remove</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default RightBar;