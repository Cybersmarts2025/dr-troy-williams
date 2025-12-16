import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';

/**
 * SECURE: Admin operations now require proper server-side authorization
 * These functions call the secure edge function instead of direct database access
 */

export const promoteUserToAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('admin-operations', {
      body: {
        operation: 'promote_user',
        target_user_id: userId
      }
    });

    if (error) {
      console.error('Error promoting user to admin:', error);
      toast.error('Failed to promote user to admin');
      return false;
    }

    if (data?.error) {
      console.error('Server error:', data.error);
      toast.error(data.error);
      return false;
    }

    toast.success(data?.message || 'User promoted to admin successfully');
    return true;
  } catch (error) {
    console.error('Error promoting user to admin:', error);
    toast.error('Failed to promote user to admin');
    return false;
  }
};

export const revokeAdminAccess = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('admin-operations', {
      body: {
        operation: 'revoke_admin',
        target_user_id: userId
      }
    });

    if (error) {
      console.error('Error revoking admin access:', error);
      toast.error('Failed to revoke admin access');
      return false;
    }

    if (data?.error) {
      console.error('Server error:', data.error);
      toast.error(data.error);
      return false;
    }

    toast.success(data?.message || 'Admin access revoked successfully');
    return true;
  } catch (error) {
    console.error('Error revoking admin access:', error);
    toast.error('Failed to revoke admin access');
    return false;
  }
};