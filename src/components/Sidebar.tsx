import { useState } from "react";
import {
  FiMenu,
  FiCalendar,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        {isOpen && <h2>Меню</h2>}
        <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
          <FiMenu />
        </button>
      </div>

      <nav className="sidebar-nav">
        <Link to="/schedule" className="nav-item">
          <FiCalendar className="nav-icon" />
          {isOpen && <span>Расписание</span>}
        </Link>
        <Link to="/user" className="nav-item">
          <FiUsers className="nav-icon" />
          {isOpen && <span>Пользователь</span>}
        </Link>
        <Link to="/settings" className="nav-item">
          <FiSettings className="nav-icon" />
          {isOpen && <span>Настройки</span>}
        </Link>
      </nav>

      <div className="sidebar-footer">
        <Link to="/logout" className="nav-item">
          <FiLogOut className="nav-icon" />
          {isOpen && <span>Выход</span>}
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
