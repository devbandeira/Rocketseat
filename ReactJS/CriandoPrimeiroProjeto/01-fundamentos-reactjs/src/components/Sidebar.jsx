import { PencilLine } from 'phosphor-react';

import styles from "./Sidebar.module.css";
import { Avatar } from './Avatar';

export function Sidebar() {
  return (
    <>
      <aside className={styles.sidebar}>
        <img
          className={styles.cover}
          src="https://images.unsplash.com/photo-1604964432806-254d07c11f32?w=200&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGV2ZWxvcGVyfGVufDB8fDB8fHww"
        />
        <div className={styles.profile}>
          <Avatar src="https://github.com/devbandeira.png" />

          <strong>DevBandeira</strong>
          <span>Developer</span>
        </div>

        <footer>
          <a href="#">
            <PencilLine size={20}/>
            editar seu perfil
          </a>
        </footer>
      </aside>
    </>
  );
}
