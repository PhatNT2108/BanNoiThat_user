function NonHeaderLayout({ children }) {
  return (
    <div className="relative ">
      <div className="flex">
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
}

export default NonHeaderLayout;
