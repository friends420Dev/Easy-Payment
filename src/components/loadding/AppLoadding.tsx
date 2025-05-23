const AddLoadding = ({status}: any) => {
    //console.log(status)
    return (<>
        <div id="loading">
            <div className={`loading2 ${!status ? "d-none" : ""}`}>
                <div className="loading-text">

                    <span className="loading-text-words">L</span>
                    <span className="loading-text-words">O</span>
                    <span className="loading-text-words">A</span>
                    <span className="loading-text-words">D</span>
                    <span className="loading-text-words">I</span>
                    <span className="loading-text-words">N</span>
                    <span className="loading-text-words">G</span>
                    <span className="loading-text-words">
                        <i className="bx bx-loader-circle icon-spin"></i>
                    </span>
                </div>
            </div>
        </div>

    </>);
}

export default AddLoadding;