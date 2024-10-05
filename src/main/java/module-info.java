module com.kpi {
    requires javafx.controls;
    requires javafx.fxml;

    opens com.kpi to javafx.fxml;
    exports com.kpi;
}
