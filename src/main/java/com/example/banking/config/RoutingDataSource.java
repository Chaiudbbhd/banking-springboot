                                  //DEVELOPED BY LAKSHMI PRASANNA KUMAR ©
package com.example.banking.config;

import com.example.banking.util.TenantContext;
import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class RoutingDataSource extends AbstractRoutingDataSource {
    @Override
    protected Object determineCurrentLookupKey() {
        return TenantContext.getCurrentTenant(); // DB key = tenantId
    }
}
