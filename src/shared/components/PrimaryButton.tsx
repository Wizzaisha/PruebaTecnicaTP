import { ReactNode } from "react";


interface PrimaryButtonProps {
    children: ReactNode;
    onClick: () => void;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, onClick }) => {


    return (
        <button onClick={onClick} className="btn btn-primary w-full">
            {children}
        </button>
    )
}

export default PrimaryButton;