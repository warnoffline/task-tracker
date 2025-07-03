export const taskStatus: Record<string, React.ReactNode> = {
  open: <div className="status status--open">Открыто</div>,
  inProgress: <div className="status status--in-progress">В процессе</div>,
  done: <div className="status status--done">Завершено</div>,
};
