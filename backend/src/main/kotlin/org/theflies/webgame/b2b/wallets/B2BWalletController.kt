package org.theflies.webgame.b2b.wallets

import io.micronaut.data.model.Page
import io.micronaut.data.model.Pageable
import io.micronaut.http.HttpRequest
import io.micronaut.http.HttpResponse
import io.micronaut.http.annotation.Body
import io.micronaut.http.annotation.Controller
import io.micronaut.http.annotation.Get
import io.micronaut.http.annotation.Post
import io.micronaut.security.annotation.Secured
import io.micronaut.security.rules.SecurityRule
import jakarta.annotation.security.RolesAllowed
import org.theflies.webgame.shared.models.Transaction

@Controller("/b2b/wallets")
class B2BWalletController(
    private val walletService: B2BWalletService,
) {
    @Post("/deposit")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @RolesAllowed("ADMIN", "STAFF")
    fun deposit(@Body depositRequest: UserDepositRequest, request: HttpRequest<*>): HttpResponse<Any> {
        walletService.deposit(depositRequest)
        return HttpResponse.ok()
    }

    @Post("/withdraw/{id}/approval")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @RolesAllowed("ADMIN", "STAFF")
    fun withdraw(id: Long, @Body approvalRequest: UserWithdrawApprovalRequest, request: HttpRequest<*>): HttpResponse<Any> {
        walletService.withdrawApproval(id, approvalRequest)
        return HttpResponse.ok()
    }

    @Get("/transactions")
    @Secured(SecurityRule.IS_AUTHENTICATED)
    @RolesAllowed("ADMIN", "STAFF")
    fun withdraw(pageable: Pageable, request: HttpRequest<*>): HttpResponse<Page<TransactionResponse>> {
        return HttpResponse.ok(walletService.getDepositWithdrawTransaction(pageable))
    }
}